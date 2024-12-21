<div className="card bg-blue-500 text-white rounded-3xl p-5">
  <div className="card-body">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-4">
      <h5 className="mb-0 text-lg font-semibold">Card details</h5>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
        className="w-11 h-11 rounded-full"
        alt="Avatar"
      />
    </div>

    {/* Card Types */}
    <p className="text-sm mb-2">Card type</p>
    <div className="flex space-x-3 text-white text-2xl">
      <button type="button">
        <i className="fab fa-cc-mastercard"></i>
      </button>
      <button type="button">
        <i className="fab fa-cc-visa"></i>
      </button>
      <button type="button">
        <i className="fab fa-cc-amex"></i>
      </button>
      <button type="button">
        <i className="fab fa-cc-paypal"></i>
      </button>
    </div>

    {/* Form Section */}
    <form className="mt-4">
      {/* Cardholder's Name */}
      <div className="mb-4">
        <input
          type="text"
          id="typeName"
          className="w-full p-3 rounded-lg text-black"
          placeholder="Cardholder's Name"
        />
        <label htmlFor="typeName" className="block text-sm mt-1">
          Cardholder's Name
        </label>
      </div>

      {/* Card Number */}
      <div className="mb-4">
        <input
          type="text"
          id="typeText"
          className="w-full p-3 rounded-lg text-black"
          placeholder="1234 5678 9012 3457"
          minLength="19"
          maxLength="19"
        />
        <label htmlFor="typeText" className="block text-sm mt-1">
          Card Number
        </label>
      </div>

      {/* Expiration and CVV */}
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <input
            type="text"
            id="typeExp"
            className="w-full p-3 rounded-lg text-black"
            placeholder="MM/YYYY"
            minLength="7"
            maxLength="7"
          />
          <label htmlFor="typeExp" className="block text-sm mt-1">
            Expiration
          </label>
        </div>
        <div className="w-1/2">
          <input
            type="password"
            id="typeCvv"
            className="w-full p-3 rounded-lg text-black"
            placeholder="●●●"
            minLength="3"
            maxLength="3"
          />
          <label htmlFor="typeCvv" className="block text-sm mt-1">
            CVV
          </label>
        </div>
      </div>
    </form>

    {/* Summary */}
    <hr className="my-4 border-gray-300" />
    <div className="flex justify-between mb-2">
      <p>Subtotal</p>
      <p>$4798.00</p>
    </div>
    <div className="flex justify-between mb-2">
      <p>Shipping</p>
      <p>$20.00</p>
    </div>
    <div className="flex justify-between mb-4">
      <p>Total (Incl. taxes)</p>
      <p>$4818.00</p>
    </div>

    {/* Checkout Button */}
    <button
      type="button"
      className="w-full bg-cyan-400 text-white py-3 px-5 rounded-lg text-lg flex justify-between items-center"
    >
      <span>$4818.00</span>
      <span>
        Checkout <i className="fas fa-long-arrow-alt-right ml-2"></i>
      </span>
    </button>
  </div>
</div>