import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Card} from "react-bootstrap";

const BrandBar = observer( () => {
    const {device} = useContext(Context);
    return (
        <div className="d-flex flex-wrap">
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className="p-3 me-2"
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </div>
    );
});

export default BrandBar;
