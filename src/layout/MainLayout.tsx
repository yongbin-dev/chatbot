import classes from "./style/mainLayout.module.css"

interface Props {
  children : JSX.Element[] | JSX.Element
}


const MainLayout = ({children} : Props) => {
  return (
    <div className={classes.main_container}>
      {/* header */}
      {children}
      {/* footer */}
    </div>
  )
}

export default MainLayout