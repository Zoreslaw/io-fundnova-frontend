import React, { useState } from "react";

const UserProfile: React.FC = () => {

    const [activeMenu, setActiveMenu] = useState(0);

    const submenuHandler = (submenuID :number) => {
        setActiveMenu(submenuID);

    }

    return (
        <div className="profilePage">
            <section className="profileMenuCategories">
                <div className="profileCategoryList"> {/*TODO: onClick needs fixing*/}
                    <button className="profileCategory" type="button" onClick={submenuHandler(1)}>InfoIcon</button>
                    <button className="profileCategory" type="button" onClick={submenuHandler(2)}>AdvcIcon</button>
                    <button className="profileCategory" type="button" onClick={submenuHandler(3)}>ProjIcon</button>
                    <button className="profileCategory" type="button" onClick={submenuHandler(4)}>FundIcon</button>
                    <button className="profileCategory" type="button" onClick={submenuHandler(5)}>PrefIcon</button>
                </div>
            </section>

            <section className="submenu">
                {activeMenu && <h2>Submenu Title</h2>}
                {/* TODO: Fill with fields*/}
            </section>
        </div>
    )
}

export default UserProfile;