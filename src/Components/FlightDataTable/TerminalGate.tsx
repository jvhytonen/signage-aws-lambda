interface TerminalGateType {
    gate: string
    terminal: string
}
const TerminalGate = (props: TerminalGateType) => {
    const terminalColor = props.terminal === '1' ? 'bg-lime-600' : 'bg-blue-600'
    return (
        <div className='w-full h-full max-h-full flex flex-col items-start justify-around py-4'>
            <p className={`rounded-lg p-2 ${terminalColor}`}>Terminal {props.terminal}</p> 
            <p className='p-2'>Gate: {props.gate}</p>
        </div>
    )
}
export default TerminalGate

// bg-${terminalColor}