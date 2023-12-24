import { type } from "os";

export interface BreadCrumbsType {
    text :string;
    href?:string;
    onclick?: () => void;
}

export interface UserType {
    email:string;
    name:string;
    uid:string;
    label?:string;
}

export type MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1";

export interface MeetingType{
    docId?: string;
    createdBy: string;
    invitedUsers: Array<string>
    maxusers: number;
    meetingDate: string;
    meetingId: string;
    meetingName: string;
    meetingType: MeetingJoinType;
    status: boolean;
}

export interface FieldErrorType {
    show:boolean;
    message: Array<string>;
}

export interface ToastType{
    id: string;
    title: string;
    colors: "success" | "primary" | "warning " | "danger" | undefined;
}

