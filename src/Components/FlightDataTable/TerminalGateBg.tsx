interface TerminalGateBgType {
    gate?: string
    terminal?: string
    baggage?:string
}
const TerminalGateBg = (props: TerminalGateBgType) => {
    const terminalColor = props.terminal === '1' ? 'bg-lime-600' : 'bg-blue-600'
    return (
        <div className='w-full h-full max-h-full flex flex-col items-start justify-around py-4'>
           {props.terminal !== null ? <p className={`rounded-lg p-2 ${terminalColor}`}>Terminal {props.terminal}</p> : null}
           <p className='p-2'>{props.gate !== null ? "Gate: " + props.gate : ''}</p>
        </div>
    )
}
export default TerminalGateBg