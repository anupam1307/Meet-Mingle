import React from 'react'
import Header from '../components/Header'
import { EuiImage,EuiCard, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import { useNavigate } from 'react-router-dom';

function CreateMeeting() {
    const navigate= useNavigate();
    return (
    <div 
    style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
        <Header />
        <EuiFlexGroup 
        justifyContent='center' 
        alignItems='center' 
        style={{margin:"5vh 10vw"}}
        >
            <EuiFlexItem>
                <EuiCard 
                icon={<EuiImage size="100%" alt="icon" src={meeting1} />}
                title={"Create 1 on 1 Meeting"}
                description="Create a Personal Single Person Meeting."
                onClick={() => navigate('/create1on1')}
                paddingSize='xl'
                />
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiCard 
                icon={<EuiImage size="100%" alt="icon" src={meeting2} />}
                title={"Create Video Conference"}
                description="Invite Multiple Persons To The Meeting."
                onClick={() => navigate('/videoconference')}
                paddingSize='xl'
                />
            </EuiFlexItem>
        </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting