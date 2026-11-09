import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchUsers } from "../features/users/UserSlice";

const UserList =()=>{
    // send actions to Redux
    const dispatch = useDispatch()

    // reading data from store
    const {users, loading, error} = useSelector(
        (state) => state.users
    );

    // bring users when run component
    useEffect (()=> {dispatch(fetchUsers())}, [dispatch])

    return(
        <div className="container mt-5">
            <div className="mb-4">  
                <span className="badge bg-primary text-center fs-2 px-4 shadow">
                    Liste des utilisateurs 
                </span>
            </div>  
            {/* loading */}
            {loading && (
                <div className="alert alert-info text-center">
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Chargement des utilisateurs ...
                </div>)}

            {/* Error */}
            {error && (
                <div className="alert alert-danger text-center">
                    Erreur : {error}
                    <button className="btn btn-outline-danger btn-sm ms-3" onClick={()=> dispatch(fetchUsers())}>
                        Réessayer
                    </button>
                </div>)}

            {/* users */}
            {!loading && !error &&(
                <div className="row g-4">
                    {users.map(user=> (
                        <div className="col-md-4" key={user.id}>
                            <div className="card shadow h-100">
                                <div className="card-body">

                                    <h5 className="card-title text-primary"> {user.name} </h5>
                                    <p className="text-muted">@{user.username}</p>
                                    <hr />
                                    <p><strong>Email :</strong> <br /> {user.email}</p>
                                    <p><strong>Phone :</strong> <br /> {user.phone}</p>
                                    <p><strong>Website :</strong> <br /> {user.website}</p>
                                    <p><strong>City :</strong> <br /> {user.address.city}</p>
                                    <p><strong>Company :</strong> <br /> {user.company.name}</p>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserList