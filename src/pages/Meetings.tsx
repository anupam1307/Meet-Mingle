import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import moment from "moment"
import { MeetingType } from '../utils/Types'
import { getDocs, query, where } from 'firebase/firestore'
import { meetingRef } from '../utils/FirebaseConfig'
import { useAppSelector } from '../app/hooks'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import { EuiBadge, EuiBasicTable, EuiButton, EuiButtonIcon, EuiCopy, EuiFlexGroup } from '@elastic/eui'
import { EuiFlexItem } from '@elastic/eui'
import { EuiPanel } from '@elastic/eui'


export default function Meeting() {
    useAuth();
    const [meetings, setMeetings] = useState<any>([])
    const userInfo = useAppSelector((zoom)=>zoom.auth.userInfo)

    useEffect(()=> {
      if (userInfo){
        const getUserMeetings = async ()=> {
            const firestoreQuery = query(meetingRef);
            const fetchedMeetings = await getDocs(firestoreQuery);
            if (fetchedMeetings.docs.length) {
                const myMeetings: Array<MeetingType> = [];
                fetchedMeetings.forEach(meetings=> {
                    const data = meetings.data() as MeetingType;
                    if(data.createdBy===userInfo?.uid) myMeetings.push(data);
                    else if(data.meetingType==="anyone-can-join")myMeetings.push(data);
                    else{
                        const index = data.invitedUsers.findIndex(user=>user===userInfo.uid)
                        if(index!==-1){
                            myMeetings.push(data);
                        }
                    }
                });
                setMeetings(myMeetings);   
            } 
        };
        getUserMeetings();
      }
    },[userInfo]);

    const columns =[
        {
            field:"meetingName",
            name:"Meeting Name"
        },
        {
            field:"meetingType",
            name:"Meeting Type"
        },
        {
            field:"meetingDate",
            name:"Meeting Date"
        },
        {
            field:"",
            name:"Status",
            render:(meeting:MeetingType)=>{
                if(meeting.status){
                    if(meeting.meetingDate === moment().format("L")){
                        return ( <EuiBadge color = "success">
                            <Link 
                            style={{color:"black"}}
                            to={`/Join.${meeting.meetingId}`}>
                                Join Now
                            </Link>
                        </EuiBadge>)
                    } else if(moment(meeting.meetingDate).isBefore(moment().format('L'))){
                        return <EuiBadge color='default'>Ended</EuiBadge>
                    } else {
                        return <EuiBadge color='primary'>Upcoming</EuiBadge>
                    }
                }else return <EuiBadge color="danger">Cancelled</EuiBadge>
            }

        },
        {
           field:"meetingId",
           name:"Copy Link",
           render:(meetingId:string) => {
            return(
            <EuiCopy textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}>
                {(copy)=>(
                    <EuiButtonIcon 
                    iconType="copy"
                    onClick={copy}
                    display='base'
                    aria-label='Meeting-copy'
                    />
                    )}
            </EuiCopy>
            );
           },
        },
    ];
  return (
    <div 
      style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
      }}
    >
    <Header/>
    <EuiFlexGroup justifyContent ="center"  style={{margin:"1rem"}}>
        <EuiFlexItem>
            <EuiPanel>
                <EuiBasicTable 
                items={meetings}
                columns={columns} />
            </EuiPanel>
        </EuiFlexItem>
    </EuiFlexGroup>
    </div>
  );
}
