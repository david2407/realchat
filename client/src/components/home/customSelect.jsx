const CustomSelect = ({className, onChange, roomsArray}) => (
    <select className={className} onChange={onChange}>
    <option key="slelect">-- Select Ocean --</option>
    {roomsArray.map(room => (
        <option key={room.name} value={room.name}>{room.name}</option>
    ))}
</select>
   )

   export default CustomSelect