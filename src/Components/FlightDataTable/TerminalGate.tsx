interface TerminalGateType {
    gate: string
    terminal: string
}
const TerminalGate = (props: TerminalGateType) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <p>Terminal {props.terminal}</p> 
            <p>Gate: {props.gate}</p>
        </div>
    )
}
export default TerminalGate