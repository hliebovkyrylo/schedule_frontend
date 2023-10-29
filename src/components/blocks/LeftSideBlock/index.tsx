import { useState } from "react";
import { HomeMainCard, Settings, ShedulesList } from "../../index";

import styles from "./leftSideBlock.module.scss";

import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const LeftSideBlock = () => {
  // Creating schedule
  const navigate = useNavigate();

  const onClickCreateSchedule = async () => {
    const { data } = await axios.post('/schedule/create'); // Route to create a schedule

    const _id = data._id; // Getting schedule id to redirecting

    navigate(`/schedule/${_id}`); // Redirecting to schedule page
  };

  // Settings
  const [openSettings, setOpenSettings] = useState(false); // By default the menu is closed

  const handleBtnClick = (ev: any) => { // When the button was pressed the settings menu opens/closes
    ev.preventDefault();

    setOpenSettings(!openSettings); // Change boolean value 
  }

  // Getting information of current user
  const { user } = useAuth0();

  // Actions with schedules
  const handleDeleteSchedule = () => {};

  const handleChangeAccess = () => {};

  return (
    <>
      <div className={styles.leftSideCards}>
        <HomeMainCard
          name={user?.name || 'User'}
          clickBtn={onClickCreateSchedule} 
        />
        <div className={styles.schedulesCard}>
          <h3>Schedules</h3>
          <div className={styles.schedulesHead}>
            <span className={styles.scheduleHeadText}>Schedule name</span>
            <div className={styles.rightSideHeadtext}>
              <span className={styles.scheduleHeadText}>Created at</span>
              <span className={[styles.scheduleHeadText, styles.lastHeadText].join(' ')}>Settings</span>
            </div>
            <span className={[styles.scheduleHeadText, styles.visibleOnPhones].join(' ')}>Settings</span>
          </div>
          <div className={styles.userSchedules}>
            {[...Array(2)].map(() => {
              return (
                <ShedulesList
                  key={'obj._id'}
                  scheduleName={'obj.groupName'} 
                  createdAt={'15.10.2023'}
                  _id={'obj._id'}
                  handleButtonClick={handleBtnClick}
                />
              )
            })}
          </div>
        </div>
      </div>
      {openSettings ? (
        <Settings
          id={'fgedgsdfrghbfdsg'}
          deleteSchedule={handleDeleteSchedule}
          changeAccess={handleChangeAccess}
          cancelButton={handleBtnClick}
        />
      ) : null}
    </>
  )
}