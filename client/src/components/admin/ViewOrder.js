import React, { useState, useEffect } from 'react';
import s from './ViewOrder.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
    cleanCart,
    putOrderById,
    getOrderById,
} from '../../store/order/order.action';

export default function ViewOrder() {
  const history=useHistory()
  const { id } = useParams()
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    state: "",
    address: "",
  });
  const user = useSelector((state) => state.userReducer.user)
  const orderId = useSelector((state) => state.orderReducer.orderId)
  

  useEffect(() => {
    dispatch(getOrderById(id))
  }, [])

    useEffect(() => {
        dispatch(getOrderById(id));
    }, []);

  const sumTotal = function () {
    let total = 0;
    if (orderId.products) {
        total= orderId.products.reduce((ac,e)=>ac+parseFloat(e.price),0)
      }
    return "$ " + total;
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = function () {
    const data = {
      state: input.state === "" ? orderId.state : input.state,
      address: input.address,
    };
    dispatch(putOrderById(parseInt(orderId.id), data));
    setEdit(false)
    // history.push(`/ViewOrder/${id}`)

  };

    const onClose = function () {
        history.push('/PageCheckoutOrders');
    };

    const onClean = function () {
        dispatch(cleanCart(id));
    };

    if (!orderUserId) {
        return (
            <div className={s.viewOrder}>
                <div className={s.content}>
                    <h3>Cargando datos...</h3>
                </div>
            </div>
        );
    }

  if (!orderId) {
    return (
        <div className={s.viewOrder}>
            <div className={s.content}>
                <h3>Panel de órdenes</h3>
                <div className={[s.info, s.topShadow].join(' ')}>
                    <p>
                        <span>Email: </span>
                        {orderUserId.user && orderUserId.user.email}
                    </p>
                    <p>
                        <span>Rol: </span>
                        {orderUserId.user && orderUserId.user.access}
                    </p>
                </div>
                <div className={[s.info, s.botShadow].join(' ')}>
                    <p>
                        <span>ID: </span>
                        {orderUserId && orderUserId.id}
                    </p>
                    <p>
                        <span>Estado: </span>
                        {edit === true ? (
                            <select
                                required
                                onChange={handleInputChange}
                                name='state'
                                id='state'
                            >
                                <option value=''>
                                    Seleccione el nuevo estado
                                </option>
                                <option value='creada'>Creada</option>
                                <option value='carrito'>Carrito</option>
                                <option value='procesando'>Procesando</option>
                                <option value='cancelada'>Cancelada</option>
                                <option value='completa'>Completa</option>
                            </select>
                        ) : (
                            orderUserId.state
                        )}
                    </p>
                    <p>
                        <span>Dirección: </span>
                        {edit === true ? (
                            <input
                                onChange={handleInputChange}
                                name='address'
                                value={input.address}
                                type='text'
                            />
                        ) : (
                            orderUserId.address
                        )}
                    </p>
                </div>
                <table className={s.itemsTable}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderUserId.products &&
                            orderUserId.products.map(function (product) {
                                return (
                                    <tr id={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                );
                            })}
                        <tr className={s.total}>
                            <td></td>
                            <td>Total:</td>
                            <td>{orderUserId.price}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={s.actions}>
                    <div className={s.editar}>
                        <p>Editar</p>
                        <label className={s.switch}>
                            <input
                                type='checkbox'
                                onChange={() => setEdit(!edit)}
                            />
                            <span
                                className={[s.slider, s.round].join(' ')}
                            ></span>
                        </label>
                    </div>
                    <div>
                        <button
                            onClick={() => onSave()}
                            className={[s.btn].join(' ')}
                            disabled={!edit}
                        >
                            Guardar cambios
                        </button>
                    </div>
                    <div>
                        {orderUserId.state === 'carrito' &&
                            orderUserId.products.length > 0 && (
                                <button
                                    onClick={onClean}
                                    className={[s.btn].join(' ')}
                                >
                                    Vaciar orden
                                </button>
                            )}
                    </div>
                    <div>
                        <button className={[s.btn].join(' ')} onClick={onClose}>
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className={s.viewOrder}>
      {console.log(orderId)}
      <div className={s.content}>
        <h3>Panel de ordenes</h3>
        <div className={[s.info, s.topShadow].join(" ")}>
          <p>
            <span>Email: </span>
            {orderId.user &&orderId.user.email}
          </p>
          <p>
            <span>Rol: </span>
            {orderId.user &&orderId.user.access}
          </p>
        </div>
        <div className={[s.info, s.botShadow].join(" ")}>
          <p>
            <span>ID: </span>
            {orderId && orderId.id}
          </p>
          <p>
            <span>Estado: </span>
            {edit === true ? (
              <select
                required
                onChange={handleInputChange}
                name="state"
                id="state"
              >
                <option value="">Seleccione el nuevo estado</option>
                <option value="creada">Creada</option>
                <option value="carrito">Carrito</option>
                <option value="procesando">Procesando</option>
                <option value="cancelada">Cancelada</option>
                <option value="completa">Completa</option>
              </select>
            ) : (
              orderId.state
            )}
          </p>
          <p>
            <span>Direccion: </span>
            {edit === true ? (
              <input
                onChange={handleInputChange}
                name="address"
                value={input.address}
                type="text"
              />
            ) : (
              orderId.address
            )}
          </p>
        </div>
        <table className={s.itemsTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio Unit.</th>
            </tr>
          </thead>
          <tbody>
            { orderId.products &&
               orderId.products.map(function (product) {
                return (
                  <tr id={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td>{product.order_line.quantity}</td>

                  </tr>
                );
              })}
            <tr className={s.total}>
              <td></td>
              <td>Total:</td>
              <td>{orderId.price}</td>
            </tr>
          </tbody>
        </table>
        <div className={s.actions}>
          <div className={s.editar}>
            <p>Editar</p>
            <label className={s.switch}>
              <input type="checkbox" onChange={() => setEdit(!edit)} />
              <span className={[s.slider, s.round].join(" ")}></span>
            </label>
          </div>
          <div>
            <button
              onClick={() => onSave()}
              className={[s.btn].join(" ")}
              disabled={!edit}
            >
              Guardar Cambios
            </button>
          </div>
          <div>
            {orderId.state === "carrito" && orderId.products.length > 0 && (
              <button onClick={onClean} className={[s.btn].join(" ")}>
                Vaciar orden
              </button>
            )}
          </div>
          <div>
            <button
              className={[s.btn].join(" ")} onClick={onClose}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
