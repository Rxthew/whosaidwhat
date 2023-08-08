
export interface CommentInterface {
    _id: string,
    content: string,
    date: string,
    post: string,
    user: UserInterface
    
}


export interface FormDialogProps {
    button: (clickHandler: () => void) => JSX.Element
    delete: boolean,
    handleSubmitConstructor: (setErrors: React.Dispatch<React.SetStateAction<Record<string, Record<string, string | boolean>>>>,) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>
    inputLabel: string,
    inputText: string,
    content?: string,
    submitLabel?: string,
  
  }

export type CommentsType = ReadonlyArray<CommentInterface>

interface PostInterface { 
    _id: string,
    title: string,
    content: string,
    date: string,
    published_status: boolean,
    user: UserInterface,
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
    posts: PostsType | null,
    resetIndexData: () => void,
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
    setPosts: React.Dispatch<React.SetStateAction<PostsType | null>>
}