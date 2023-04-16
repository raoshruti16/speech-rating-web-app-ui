import React, {useState} from "react";
import UserPageComponents from "../user-page/user-page-components/UserPageComponents";
import AdminPageComponents from "../admin-page/admin-page-components/AdminPageComponents";

function UserPage() {
    const [isAdmin, setIsAdmin] = useState(true);
    // const {
    //     isUserAdmin
    //   } = useBatchStudyInfo();
    //   console.log("is user admin ", isUserAdmin);
    // function checkAdmin() {
    //     const isAdminUser = // true or false depending on whether the user is an admin
    //     setIsAdmin(isAdminUser);
    //   }
    return(
        <div>
            {isAdmin ? <AdminPageComponents /> : <UserPageComponents />}
            {/* <UserPageComponents/> */}
        </div>
    );
}

export default UserPage;