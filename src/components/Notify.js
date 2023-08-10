import toast from "react-hot-toast";
import classNames from "classnames";
import {HiLightningBolt} from "react-icons/hi";
import {MdOutlineClose} from "react-icons/md";

export const Notify = (title, message, type = 'notificationSuccess') =>
    toast.custom(
        (t) => (
            <div
                className={classNames([
                    type,
                    'notificationWrapper',
                    t.visible ? "top-0" : "-top-96",
                ])}
            >
                <div className={'iconWrapper'}>
                    <HiLightningBolt/>
                </div>
                <div className={'contentWrapper'}>
                    <h1>{title}</h1>
                    <p>
                        {message}
                    </p>
                </div>
                <div className={'closeIcon'} onClick={() => toast.dismiss(t.id)}>
                    <MdOutlineClose/>
                </div>
            </div>
        ),
        {id: "unique-notification", position: "top-center"}
    );