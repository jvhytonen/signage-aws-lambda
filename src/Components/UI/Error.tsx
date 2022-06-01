interface ErrorType {
    message: string
}

const Error = (props: ErrorType) => {
    return (
        <div className='h-full w-full flex justify-center items-center absolute'>
            <div className='bg-red-500 m-auto p-5'>
            <p>{props.message}</p>     
            </div>
        </div>
    )
}
export default Error