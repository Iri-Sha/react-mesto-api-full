function Header({children}) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__user-info">
                {children}
            </div>
        </header>
    )
}
  
export default Header