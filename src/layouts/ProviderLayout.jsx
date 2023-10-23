import { Outlet } from 'react-router-dom';

const ProviderLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

ProviderLayout.propTypes = {};

export default ProviderLayout;
