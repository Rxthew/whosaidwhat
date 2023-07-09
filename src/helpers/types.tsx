export interface CommentInterface {
    _id: string,
    content: string,
    date: string,
    user?: Record<'username', string | UserInterface>
    
}

type CommentsType = ReadonlyArray<CommentInterface>

interface PostInterface { 
    _id: string,
    title: string,
    content: string,
    published_status: boolean,
    user: string | UserInterface,
    comments: CommentsType
}


export interface UserInterface { 
    _id: string,
    username: string,
    member_status: "regular" | "privileged" | "admin"
    first_name?: string,
    last_name?: string
}

export type PostsType = ReadonlyArray<PostInterface>

export interface IndexInterface {
    user: UserInterface | null,
    posts: PostsType | null
}