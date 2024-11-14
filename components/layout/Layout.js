
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

export default function Layout({ children }) {

    const {status} = useSession();

    const logOutHandler = () => {
        signOut();
    }
    return (
        <div className='container'>
            <header>
                <p> Todo App</p>
                {status === "authenticated" ? <button onClick={logOutHandler}>LogOut <FiLogOut/> </button> : null}
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


