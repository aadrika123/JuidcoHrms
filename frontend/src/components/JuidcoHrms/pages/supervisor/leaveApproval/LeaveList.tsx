import LeaveCard from "./LeaveCard"

export default function LeaveList(props: any) {

    const { data, setIsUpdated, isUpdated } = props

    return (
        <div className="grid grid-cols-3 gap-4">
            {data.map((item, index) => (
                <LeaveCard key={index} data={item} setIsUpdated={setIsUpdated} isUpdated={isUpdated} />
            ))}
        </div>
    )
}
