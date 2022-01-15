import "./App.css";
import { useState } from "react";
// import Table from "./Components/Table";

//Controlled Form --> This is when state control the velue of the input field
//Uncontrolled Form --> This is when state doesnot control the velue of the input field

function App() {
    const [mainData, setMainData] = useState([]);
    const [addData, setAddData] = useState({
        productName: "",
        perPrice: "",
        quantity: "",
        amount: "",
        discount: "",
        discountedAmount: "",
    });

    const handleAddDetails = (e) => {
        // e.preventDefault();
        const fieldname = e.target.getAttribute("name");
        const fieldvalue = e.target.value;
        //First storing the value of the old stored data
        const newFormData = { ...addData };
        newFormData[fieldname] = fieldvalue;
        setAddData(newFormData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let amount = addData.perPrice * addData.quantity;
        const newMainData = {
            productName: addData.productName,
            perPrice: addData.perPrice,
            quantity: addData.quantity,
            amount: amount,
            discount: addData.discount,
            discountedAmount:
                amount - (parseInt(addData.discount) / 100) * amount,
        };
        // console.log(e.target[1]);
        //clearning the field
        // for (let i = 0; i < 4; i++) {
        //     e.target[i].value = "";
        // }
        //First store the old data then the new data
        const newMainDatas = [...mainData, newMainData];
        // setMainData((state) => {
        //     state.push(newMainData);
        //     return [...state];
        // });
        setMainData(newMainDatas);
        setAddData({
            productName: "",
            perPrice: "",
            quantity: "",
            discount: "",
        });
    };
    // console.log(mainData);
    return (
        <div className="container my-5">
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Products</th>
                        <th scope="col">Per Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Discounted Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {mainData.map((data, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.productName}</td>
                            <td>{data.perPrice}</td>
                            <td>{data.quantity}</td>
                            <td>{data.amount}</td>
                            <td>{data.discount}</td>
                            <td>{data.discountedAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h3>Enter new product details: </h3>
                <form
                    className="d-flex justify-content-between"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="productName"
                        required="required"
                        placeholder="Enter product name..."
                        value={addData.productName} // this makes controlled form
                        onChange={handleAddDetails}
                    />
                    <input
                        type="number"
                        name="perPrice"
                        required="required"
                        placeholder="Enter per piece price..."
                        value={addData.perPrice}
                        onChange={handleAddDetails}
                    />
                    <input
                        type="number"
                        name="quantity"
                        required="required"
                        placeholder="Enter quantity..."
                        value={addData.quantity}
                        onChange={handleAddDetails}
                    />
                    <input
                        type="number"
                        name="discount"
                        max="100"
                        required="required"
                        placeholder="Enter discount if any..."
                        value={addData.discount}
                        onChange={handleAddDetails}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default App;
