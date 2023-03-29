import Footer from "./Footer/Footer";
import AdminNavbar from "./NavBar/NavBar";
import "./Home.css";

function AdminHome () {
    return (
        <div>
            <AdminNavbar />
            <div className="containerAdmin">
                <div className="admin-home">
                    <section>
                        <h1>Admin Home</h1>
                        <p>Choose users or deals for actions</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminHome;