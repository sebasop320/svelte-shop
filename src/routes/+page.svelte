<script>
  import { isLoggedIn, user } from "./firebase/stores";
  import { getProducts } from "./products";
  import { login } from "./login";
  import { logout } from "./logOut";
  
  let cart = [];
  const products = getProducts();

  const addToCart = (product) => {
    for (let item of cart) {
      if (item.id === product.id) {
        product.quantity += 1;
        cart = cart;
        return;
      }
    }
    cart = [...cart, product];
  };

  const minusItem = (product) => {
    for (let item of cart) {
      if (item.id === product.id) {
        if (product.quantity > 1) {
          product.quantity -= 1;
          cart = cart;
        } else {
          cart = cart.filter((cartItem) => cartItem !== product);
        }
        return;
      }
    }
  };

  const plusItem = (product) => {
    for (let item of cart) {
      if (item.id === product.id) {
        item.quantity += 1;
        cart = cart;
        return;
      }
    }
  };

  let total = 0;
  $: {
    total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
</script>

<title>E-shop with Svelte</title>

<p>There are {cart.length} items in your cart</p>

<div class="product-list">
  {#each products as product}
  <div>
    <div class="image" style="background-image: url({product.image})"></div>
    <h4>{product.name}</h4>
    <p>${product.price}</p>
    <button on:click={() => addToCart(product)}>Add to cart</button>
  </div>
  {/each}
</div>

<div class="cart-list">
  {#each cart as item}
  {#if item.quantity > 0}
  <div class="cart-item">
    <img width="50" src={item.image} alt={item.name} />
    <div>
      {item.quantity}
      <button on:click={() => plusItem(item)}>+</button>
      <button on:click={() => minusItem(item)}>-</button>
    </div>
    <p>${item.price * item.quantity}</p>
  </div>
  {/if}
  {/each}
  <div class="total">
    <h4>Total: $ {total}</h4>
  </div>
</div>

<!-- Display order details if available -->


<!-- Login button in the top right corner -->
<div class="login-button">
  {#if $isLoggedIn}
  <img src={$user.photoURL} alt={$user.displayName} class="profile-image" />
  <h3>{$user.displayName}</h3>
  {:else}
  <button on:click={login}>Login</button>
  {/if}
</div>

<!-- logout button -->
<div class="logOut-button">
  {#if $isLoggedIn}
  <button on:click={logout}>LogOut</button>
  {/if}
</div>

<footer>
  <div class="footer-content">
    <p>Inspired by:</p><a href="https://svelte.dev/repl/f894a09732d74059b4820324dae003c1?version=3.32.3">WebJeda</a>
    <p>Brought to life by:</p><a href="https://sebasopdev.com">Sebasopdev</a>
  </div>
</footer>


<style>
  .product-list,
  .cart-item {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .image {
    height: 150px;
    width: 150px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .logOut-button {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .logOut-button button {
    cursor: pointer;
    outline: none;
    padding: 0;
    margin: 0;
  }

  .total {
    text-align: right;
  }

  .cart-list {
    border: 2px solid;
    padding: 10px;
  }

  .login-button {
    height: 55px;
    width: 55px;
    position: absolute;
    top: 10px;
    right: 60px;
  }

  .login-button button {
    cursor: pointer;
    outline: none;
    padding: 0;
    margin: 0;
  }

  .profile-image {
    margin-right: 10px;
  }

  footer {
    background-color: #f2f2f2;
    padding: 20px;
    text-align: center;
  }

  
</style>
