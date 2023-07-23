const NotificationBodyRightDrawer = () => {
    return (
        <>
            {[...Array(15)].map((_, i) => {
                return (
                    <div
                        key={i}
                        className={
                            "bg-layouts-200 card rounded-box mt-3 grid p-3" +
                            (i < 5 ? " bg-blue-100" : "")
                        }
                    >
                        {i % 2 === 0
                            ? `Your sales has increased by 30% yesterday`
                            : `Total likes for instagram post - New launch this week,  has crossed 100k `}
                    </div>
                );
            })}
        </>
    );
};

export default NotificationBodyRightDrawer;
