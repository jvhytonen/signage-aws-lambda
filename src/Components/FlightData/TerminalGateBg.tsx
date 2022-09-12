interface TerminalGateBgType {
    gate?: string
    terminal?: string
    baggage?: string
    type: string
}
const TerminalGateBg = (props: TerminalGateBgType) => {
    const terminalColor = props.terminal === '1' ? 'bg-lime-600' : 'bg-blue-600'
    const renderType = (type: string) => {
        switch (type) {
            case 'departures':
                return (
                    <div className='w-full h-full max-h-full flex flex-col items-start justify-around py-4'>
                        {props.terminal !== null ? <p className={`rounded-lg p-2 ${terminalColor}`}>Terminal {props.terminal}</p> : null}
                        <p className='p-2'>{props.gate !== null ? "Gate: " + props.gate : ''}</p>
                    </div>
                )
            case 'arrivals':
                return (
                    <div className='w-full h-full max-h-full flex flex-col items-start justify-around py-4'>
                        {props.terminal !== null ? <p className={`rounded-lg p-2 ${terminalColor}`}>Terminal {props.terminal}</p> : null}
                        <p className='p-2'>{props.baggage !== null ? "Baggage: " + props.baggage : ''}</p>
                    </div>
                )
        }
    }

    return (
        <>
            {renderType(props.type)}
        </>
    )
}
export default TerminalGateBg