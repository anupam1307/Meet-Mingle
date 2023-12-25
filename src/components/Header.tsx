import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { useDispatch } from 'react-redux';
import { EuiButton, EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { changeTheme } from '../app/slices/AuthSlice';
import { getCreateMeetingBreadCrumbs, getMeetingsBreadcrumbs, getMyMeetingsBreadcrumbs, getOneonOneMeetingBreadCrumbs, getVideoConferenceBreadCrumbs } from '../utils/breadCrumbs';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = useAppSelector((zoom) => zoom.auth.userInfo?.name);
    const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);

    const [breadCrumbs, setBreadCrumbs] = useState([{text: "Dashboard"}]);
    const [isResponsive, setIsResponsive] = useState(false);
    const dispatch = useDispatch();
    const logout = () =>{
        signOut(firebaseAuth);
    };

    useEffect(() => {
        const { pathname } = location;
        if (pathname=== "/create")
            setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
        else if(pathname==="/create1on1") 
            setBreadCrumbs(getOneonOneMeetingBreadCrumbs(navigate));
        else if(pathname=== "/videoconference") 
            setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
        else if(pathname==="/mymeetings")
            setBreadCrumbs(getMyMeetingsBreadcrumbs(navigate))
        else if(pathname==="/meetings")
            setBreadCrumbs(getMeetingsBreadcrumbs(navigate))
    },[location,navigate]);

    const invertTheme =() =>{
        const theme = localStorage.getItem("zoom-theme")
        localStorage.setItem("zoom-theme", theme==="light" ?"dark" : "light");
        dispatch(changeTheme({isDarkTheme: !isDarkTheme}))
    }

    const section = [
        {
        items:[
            <Link to="/">
                <img src='<a href="https://www.flaticon.com/free-icons/movie-camera" title="movie camera icons">Movie camera icons created by Freepik - Flaticon</a>' 
                alt="MeetMingle Logo" 
                style={{ width: '50px', height: '50px', marginRight: '10px' }}>
                    
                </img>
            </Link>,
        ],
    },
    {
        items:[
            <>
                { username?(
                    <EuiText>
                        <div className='UserName'>
                            <EuiTextColor color="white">Hello,</EuiTextColor>
                            <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
                        </div>
                    </EuiText>
                ):null}
            </>,
         ],
       }, 
       {
        items:[
            <EuiFlexGroup 
            justifyContent='center' 
            alignItems='center' 
            direction='row' 
            style={{gap:"2vw"}}
            >
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    {isDarkTheme ?(
                <EuiButtonIcon 
                    onClick={invertTheme} 
                    iconType="sun" 
                    display='fill' 
                    size='s' 
                    color='warning'
                    aria-label='invert-theme-button'
                />
                ) : (
                <EuiButtonIcon 
                    onClick={invertTheme} 
                    iconType="moon"
                    display='fill'
                    size='s' 
                    color='primary'
                    aria-label='invert-theme-button'
                />
                )}
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    <EuiButtonIcon 
                    onClick={logout} 
                    iconType="lock" 
                    display='fill' 
                    size='s' 
                    aria-label='logout-button'/>
                </EuiFlexItem>
            </EuiFlexGroup>
        ],
       },
];
    const responsiveSection = [{
        items:[
            <Link to="/">
                <EuiText>
                    <h2 style={{padding:"0 1vw"}}>
                        <EuiTextColor color = "#0b5cff">MeetMingle</EuiTextColor>
                    </h2>
                </EuiText>
            </Link>,
        ],
    },
    // {
    //     items:[
    //         <Link to="/">
    //             <EuiText>
    //                 <h2 style={{padding:"0 1vw"}}>
    //                     <EuiTextColor color = "#0b5cff">MeetMingle</EuiTextColor>
    //                 </h2>
    //             </EuiText>
    //         </Link>,
    //     ],
    // },
    {
        items:[
            <>
                { username?(
                    <EuiText>
                        <div className='UserName'>
                            <EuiTextColor color="white">Hello,</EuiTextColor>
                            <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
                        </div>
                    </EuiText>
                ):null}
            </>,
         ],
       }, 
       {
        items:[
            <EuiFlexGroup 
            justifyContent='center' 
            alignItems='center' 
            direction='row' 
            style={{gap:"2vw"}}
            >
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    {isDarkTheme ?(
                <EuiButtonIcon 
                    onClick={invertTheme} 
                    iconType="sun" 
                    display='fill' 
                    size='s' 
                    color='warning'
                    aria-label='invert-theme-button'
                />
                ) : (
                <EuiButtonIcon 
                    onClick={invertTheme} 
                    iconType="moon"
                    // display='fill'
                    size='s' 
                    color='primary'
                    aria-label='invert-theme-button'
                />
                )}
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{flexBasis:"fit-content"}}>
                    <EuiButtonIcon 
                    onClick={logout} 
                    iconType="lock" 
                    display='fill' 
                    size='s' 
                    aria-label='logout-button'/>
                </EuiFlexItem>
            </EuiFlexGroup>
        ],
       },
];

    useEffect(() => {
      if (window.innerWidth<480) setIsResponsive(true);
      },[]);
    

  return (
  <>
  <EuiHeader
      style={{minHeight: "8vh", width:"100vw",overflow:"hidden"}} 
      theme='dark' 
      sections={isResponsive ? responsiveSection: section} 

  />
    <EuiHeader 
      style={{minHeight: "8vh"}} 
      sections={[{ breadcrumbs: breadCrumbs }]}
    />
  </>
  );
}
export default Header