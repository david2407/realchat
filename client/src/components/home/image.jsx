const UserImage = ({image, className, ref}) => (
    <img ref={ref} className={className} src={image} alt="user" />
)

export default UserImage