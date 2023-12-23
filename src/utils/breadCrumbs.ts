import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./Types";


export const getCreateMeetingBreadCrumbs = (
    navigate:NavigateFunction): 
    Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "Dashboard",
        onclick: () => {
            navigate("/create");
        },
},
    {
        text: "Create Meeting",
    },
];

export const getOneonOneMeetingBreadCrumbs=(
    navigate: NavigateFunction
):Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "Dashboard",
        onclick: () => {
            navigate("/");
        },
    },
    {
        text:"Create Meeting",
        href: "Create Meeting",
        onclick: () => {
            navigate("/create");
        },
    },
    {
        text:"Create One On ONe Meeting",
    },
];

export const getVideoConferenceBreadCrumbs=(
    navigate: NavigateFunction
):Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "Dashboard",
        onclick: () => {
            navigate("/");
        },
    },
    {
        text:"Create Meeting",
        href: "Create Meeting",
        onclick: () => {
            navigate("/create");
        },
    },
    {
        text:"Create Video Conference",
    },
];

export const getMyMeetingsBreadcrumbs=(
    navigate: NavigateFunction
):Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "Dashboard",
        onclick: () => {
            navigate("/");
        },
    },
    {
        text:"My Meetings",
    },
];

export const getMeetingsBreadcrumbs=(
    navigate: NavigateFunction
):Array<BreadCrumbsType> => [
    {
        text: "Dashboard",
        href: "Dashboard",
        onclick: () => {
            navigate("/");
        },
    },
    {
        text:"Meetings",
    },
];