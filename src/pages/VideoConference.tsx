import React, { useState } from 'react'
import Header from '../components/Header';
import { EuiFlexGroup, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch } from '@elastic/eui';
import MeetingNameField from '../components/FormComponents/MeetingNameField';
import MeetingUsersField from '../components/FormComponents/MeetingUsersField';
import useAuth from '../hooks/useAuth';
import useFetchUsers from '../hooks/useFetchUsers';
import moment from "moment";
import MeetingDateField from '../components/FormComponents/MeetingDateField';
import CreateMeetingButton from '../components/FormComponents/CreateMeetingButtons';
import { FieldErrorType, UserType } from '../utils/Types';
import { addDoc } from 'firebase/firestore';
import { meetingRef } from '../utils/FirebaseConfig';
import { generateMeetingId } from '../utils/generateMeetingId';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
// import { User } from 'firebase/auth';
// import { any } from 'prop-types';
// import { EuiSwitchEvent } from '@elastic/eui/src/components/form/switch';
import MeetingMaximumUserField from '../components/FormComponents/MeetingMaximumUserField';

function VideoConference() {
      useAuth();
    const [users] = useFetchUsers();
    const [createToast] = useToast();
    const navigate = useNavigate();

    const uid = useAppSelector((zoom:any) => zoom.auth.userInfo?.uid);
    const [meetingName, setMeetingName] = useState("");
    const [selectedUsers,setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1);
    const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
    const [showErrors, setShowErrors] = useState<{
      meetingName:FieldErrorType;
      meetingUser:FieldErrorType;
    }>({
      meetingName:{
        show:false,
        message: [],
      },
      meetingUser:{
        show:false,
        message: [],
      },
    });

    const onUserChange = (selectedOptions:any) => {
      setSelectedUsers(selectedOptions);
    };

    const validateForm = () => {
      let errors = false;
      const clonedShowErrors = {...showErrors}
      if (!meetingName.length) {
        clonedShowErrors.meetingName.show = true;
        clonedShowErrors.meetingName.message = ["Please Enter Meeting Name"];
        errors = true;
      } else {
        clonedShowErrors.meetingName.show=false;
        clonedShowErrors.meetingName.message=[];
      }
      if (!selectedUsers.length) {
        clonedShowErrors.meetingUser.show = true;
        clonedShowErrors.meetingUser.message = ["Please select a user "];
      }else{
        clonedShowErrors.meetingUser.show = false;
        clonedShowErrors.meetingUser.message = [];
      }
      setShowErrors(clonedShowErrors);
      return errors;
    };

    const CreateMeeting= async () => {
      if (!validateForm()) {
        const meetingId = generateMeetingId ();
        await addDoc(meetingRef,{
          createdBy:uid,
          meetingId,
          meetingName,
          meetingType:anyoneCanJoin?"anyone-can-join":"video-conference",
          invitedUsers: anyoneCanJoin? []: selectedUsers.map((user:UserType) => user.uid),
          meetingDate:startDate.format("L"),
          maxUsers:anyoneCanJoin ? 100 : size ,
          status:true,
        });
        createToast({
          title: anyoneCanJoin 
          ? "Anyone can join meeting created successfully":
          "video conference created successfully",
          type:"success"
        })
        navigate("/")
    }
  };
    return (
    <div
    style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
        <Header/>
        <EuiFlexGroup justifyContent="center" alignItems="center">
            <EuiForm>
                <EuiFormRow display='columnCompressedSwitch' label="Anyone can Join">
                    <EuiSwitch 
                            showLabel={false} 
                            label="Anyone can Join"
                            checked={anyoneCanJoin} 
                            onChange={e =>setAnyoneCanJoin(e.target.checked)}                    
                            compressed
                            />
                </EuiFormRow>
                <MeetingNameField
                label="Meeting Name"
                placeholder="Meeting Name"
                value={meetingName}
                setMeetingName= {setMeetingName}
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}
                />
                {
                    anyoneCanJoin ? (
                    < MeetingMaximumUserField value={size} setValue={setSize} />
                ) : (
                <MeetingUsersField  
                  label = "Invite User" 
                  options={users} 
                  onChange={onUserChange} 
                  selectedOptions={selectedUsers} 
                  singleSelection={false}
                  isClearable={false}
                  placeholder="select a user"
                  isInvalid={showErrors.meetingUser.show}
                  error={showErrors.meetingUser.message}
                />
                )}
                <MeetingDateField 
                selected={startDate} 
                setStartDate={setStartDate}
                />
                <EuiSpacer />
                <CreateMeetingButton createMeeting={CreateMeeting}/>
            </EuiForm>
        </EuiFlexGroup>
    </div>
  );
}

export default VideoConference;