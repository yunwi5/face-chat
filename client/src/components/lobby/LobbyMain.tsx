import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getVideoChatRoomRoute } from 'utils/routes';

interface FormValues {
    name: string;
    room: string;
}

const LobbyMain = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const submitHandler: SubmitHandler<FormValues> = (values) => {
        console.log(values);
        const { name, room } = values;
        sessionStorage.setItem('userName', name);
        navigate(getVideoChatRoomRoute(room));
    };

    return (
        <main id="room__lobby__container">
            <div id="form__container">
                <div id="form__container__header">
                    <p>👋 Create or Join Room</p>
                </div>

                <form id="lobby__form" onSubmit={handleSubmit(submitHandler)}>
                    <div className="form__field__wrapper">
                        <label>Your Name</label>
                        <input
                            type="text"
                            // name="name"
                            {...register('name', {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message: 'Name should be at least 3 characters!',
                                },
                            })}
                            placeholder="Enter your display name..."
                        />
                    </div>

                    <div className="form__field__wrapper">
                        <label>Room Name</label>
                        <input
                            type="text"
                            placeholder="Enter room name..."
                            {...register('room', {
                                required: true,
                            })}
                        />
                    </div>

                    <div className="form__field__wrapper">
                        <button type="submit">
                            Go to Room
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default LobbyMain;
