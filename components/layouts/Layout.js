import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi"
import { RxDashBoard } from "react-icons/rx"



const Layout = ({ children }) => {
    return (
        <div className='container'>
            <header>
                <p> Todo App</p>
            </header>
            <div className="container--main">
                <aside>
                    <p> Welcome </p>
                    <ul>
                        <li>
                            <VscListSelection />
                            <Link href="/">
                                Todos
                            </Link>
                        </li>
                        <li>
                            <BiMessageSquareAdd />
                            <Link href="/">
                                Todos
                            </Link>
                        </li>
                        <li>
                            <RxDashBoard />
                            <Link href="/">
                                Todos
                            </Link>
                        </li>
                    </ul>
                </aside>
                <section >
                    {children}
                </section>
            </div>
        </div>
    )
}

export default Layout
