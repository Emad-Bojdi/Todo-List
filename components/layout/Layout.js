
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";

export default function Layout({ children }) {
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
                            <RxDashboard/>
                            <Link href="/">
                                Todos
                            </Link>
                        </li>
                        <li>
                            <VscListSelection />
                            <Link href="/add-todo">
                                Add Todo
                            </Link>
                        </li>
                        <li>
                            <BiMessageSquareAdd />
                            <Link href="/profile">
                                Profile
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


