/* =========================================================
   THE BURGER — COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SETTINGS
    ===================================================== */

    const WHATSAPP_NUMBER = "923103730188";
    const DELIVERY_CHARGE = 100;


    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen =
                navbar.classList.contains("active");

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       MENU FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const menuCards =
        document.querySelectorAll(".menu-card");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            menuCards.forEach((card) => {

                const cardCategory =
                    card.dataset.category;

                if (
                    category === "all" ||
                    cardCategory === category
                ) {

                    card.style.display = "";

                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform =
                            "scale(1)";
                    }, 20);

                } else {

                    card.style.opacity = "0";
                    card.style.transform =
                        "scale(0.95)";

                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);

                }

            });

        });

    });


    /* =====================================================
       CART ELEMENTS
    ===================================================== */

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartPanel =
        document.getElementById("cartPanel");

    const cartOpen =
        document.getElementById("cartOpen");

    const cartClose =
        document.getElementById("cartClose");

    const cartItemsContainer =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartSubtotal =
        document.getElementById("cartSubtotal");

    const cartDelivery =
        document.getElementById("cartDelivery");

    const cartTotal =
        document.getElementById("cartTotal");

    const checkoutBtn =
        document.getElementById("checkoutBtn");

    let cart = [];


    /* =====================================================
       PRICE FORMAT
    ===================================================== */

    function formatPrice(amount) {

        return `Rs. ${Number(amount).toLocaleString("en-PK")}`;

    }


    /* =====================================================
       OPEN CART
    ===================================================== */

    function openCart() {

        if (cartPanel) {
            cartPanel.classList.add("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }

        document.body.classList.add("cart-open");

    }


    /* =====================================================
       CLOSE CART
    ===================================================== */

    function closeCart() {

        if (cartPanel) {
            cartPanel.classList.remove("active");
        }

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }

        document.body.classList.remove("cart-open");

    }


    if (cartOpen) {
        cartOpen.addEventListener(
            "click",
            openCart
        );
    }

    if (cartClose) {
        cartClose.addEventListener(
            "click",
            closeCart
        );
    }

    if (cartOverlay) {
        cartOverlay.addEventListener(
            "click",
            closeCart
        );
    }


    /* =====================================================
       ADD TO CART
    ===================================================== */

    const addCartButtons =
        document.querySelectorAll("[data-add-cart]");

    addCartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".menu-card");

            if (!card) return;

            const id =
                card.dataset.id;

            const name =
                card.dataset.name;

            const price =
                Number(card.dataset.price);

            const imageElement =
                card.querySelector("img");

            const image =
                imageElement
                    ? imageElement.getAttribute("src")
                    : "";

            const existingItem =
                cart.find(item => item.id === id);

            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });

            }

            updateCart();

            openCart();

        });

    });


    /* =====================================================
       UPDATE CART
    ===================================================== */

    function updateCart() {

        if (!cartItemsContainer) return;

        if (cart.length === 0) {

            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <span>🛒</span>
                    <h4>Your cart is empty</h4>
                    <p>Add something delicious from our menu.</p>
                </div>
            `;

        } else {

            cartItemsContainer.innerHTML =
                cart.map(item => {

                    return `
                        <div
                            class="cart-item"
                            data-id="${item.id}"
                        >

                            <div class="cart-item-image">
                                ${
                                    item.image
                                    ? `
                                        <img
                                            src="${item.image}"
                                            alt="${item.name}"
                                        >
                                    `
                                    : `
                                        <span>🍔</span>
                                    `
                                }
                            </div>

                            <div class="cart-item-info">

                                <h4>${item.name}</h4>

                                <strong>
                                    ${formatPrice(item.price)}
                                </strong>

                                <div class="cart-item-controls">

                                    <button
                                        type="button"
                                        class="quantity-btn"
                                        data-action="decrease"
                                        data-id="${item.id}"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        class="quantity-btn"
                                        data-action="increase"
                                        data-id="${item.id}"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            <button
                                type="button"
                                class="cart-remove"
                                data-action="remove"
                                data-id="${item.id}"
                            >
                                ×
                            </button>

                        </div>
                    `;

                }).join("");

        }

        updateCartTotals();

    }


    /* =====================================================
       CART ACTIONS
    ===================================================== */

    if (cartItemsContainer) {

        cartItemsContainer.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!button) return;

                const action =
                    button.dataset.action;

                const id =
                    button.dataset.id;

                const item =
                    cart.find(
                        product => product.id === id
                    );

                if (!item) return;


                if (action === "increase") {
                    item.quantity++;
                }


                if (action === "decrease") {

                    item.quantity--;

                    if (item.quantity <= 0) {

                        cart = cart.filter(
                            product =>
                                product.id !== id
                        );

                    }

                }


                if (action === "remove") {

                    cart = cart.filter(
                        product =>
                            product.id !== id
                    );

                }


                updateCart();

            }
        );

    }


    /* =====================================================
       CALCULATE SUBTOTAL
    ===================================================== */

    function calculateSubtotal() {

        return cart.reduce(
            (total, item) => {

                return total +
                    item.price *
                    item.quantity;

            },
            0
        );

    }


    /* =====================================================
       UPDATE CART TOTALS
    ===================================================== */

    function updateCartTotals() {

        const subtotal =
            calculateSubtotal();

        const delivery =
            cart.length > 0
                ? DELIVERY_CHARGE
                : 0;

        const total =
            subtotal + delivery;

        const totalItems =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );


        if (cartCount) {
            cartCount.textContent =
                totalItems;
        }

        if (cartSubtotal) {
            cartSubtotal.textContent =
                formatPrice(subtotal);
        }

        if (cartDelivery) {
            cartDelivery.textContent =
                formatPrice(delivery);
        }

        if (cartTotal) {
            cartTotal.textContent =
                formatPrice(total);
        }


        if (checkoutBtn) {

            checkoutBtn.disabled =
                cart.length === 0;

        }

    }


    /* =====================================================
       ORDER MODAL
    ===================================================== */

    const orderModal =
        document.getElementById("orderModal");

    const orderModalClose =
        document.getElementById(
            "orderModalClose"
        );

    const orderForm =
        document.getElementById("orderForm");

    const finalOrderItems =
        document.getElementById(
            "finalOrderItems"
        );

    const finalOrderTotal =
        document.getElementById(
            "finalOrderTotal"
        );


    /* =====================================================
       OPEN ORDER MODAL
    ===================================================== */

    function openOrderModal() {

        if (cart.length === 0) {

            alert(
                "Please add at least one item."
            );

            return;
        }

        renderFinalOrder();

        if (orderModal) {
            orderModal.classList.add("active");
        }

        document.body.classList.add(
            "modal-open"
        );

        closeCart();

    }


    /* =====================================================
       CLOSE ORDER MODAL
    ===================================================== */

    function closeOrderModal() {

        if (orderModal) {
            orderModal.classList.remove(
                "active"
            );
        }

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            "click",
            openOrderModal
        );

    }


    if (orderModalClose) {

        orderModalClose.addEventListener(
            "click",
            closeOrderModal
        );

    }


    if (orderModal) {

        orderModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === orderModal
                ) {
                    closeOrderModal();
                }

            }
        );

    }


    /* =====================================================
       FINAL ORDER PREVIEW
    ===================================================== */

    function renderFinalOrder() {

        if (!finalOrderItems) return;

        const subtotal =
            calculateSubtotal();

        const delivery =
            cart.length > 0
                ? DELIVERY_CHARGE
                : 0;

        const total =
            subtotal + delivery;


        finalOrderItems.innerHTML = `

            ${cart.map(item => `

                <div class="final-order-item">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${formatPrice(
                            item.price *
                            item.quantity
                        )}
                    </strong>

                </div>

            `).join("")}

            <div class="final-order-item">
                <span>Subtotal</span>
                <strong>
                    ${formatPrice(subtotal)}
                </strong>
            </div>

            <div class="final-order-item">
                <span>Delivery</span>
                <strong>
                    ${formatPrice(delivery)}
                </strong>
            </div>

        `;


        if (finalOrderTotal) {

            finalOrderTotal.textContent =
                total.toLocaleString("en-PK");

        }

    }


    /* =====================================================
       ORDER FORM → WHATSAPP
    ===================================================== */

    if (orderForm) {

        orderForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;
                }


                const nameInput =
                    document.getElementById(
                        "customerName"
                    );

                const phoneInput =
                    document.getElementById(
                        "customerPhone"
                    );

                const addressInput =
                    document.getElementById(
                        "customerAddress"
                    );

                const noteInput =
                    document.getElementById(
                        "customerNote"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const address =
                    addressInput
                        ? addressInput.value.trim()
                        : "";

                const note =
                    noteInput
                        ? noteInput.value.trim()
                        : "";


                if (
                    !name ||
                    !phone ||
                    !address
                ) {

                    alert(
                        "Please enter your name, phone number and address."
                    );

                    return;
                }


                const subtotal =
                    calculateSubtotal();

                const delivery =
                    DELIVERY_CHARGE;

                const total =
                    subtotal + delivery;


                let message = "";

                message +=
                    "🍔 *THE BURGER — NEW ORDER*\n";

                message +=
                    "============================\n\n";

                message +=
                    "*CUSTOMER DETAILS*\n";

                message +=
                    `Name: ${name}\n`;

                message +=
                    `Phone: ${phone}\n`;

                message +=
                    `Address: ${address}\n`;

                if (note) {

                    message +=
                        `Note: ${note}\n`;

                }


                message +=
                    "\n*ORDER DETAILS*\n";


                cart.forEach((item, index) => {

                    const itemTotal =
                        item.price *
                        item.quantity;

                    message +=
                        `${index + 1}. ${item.name}\n`;

                    message +=
                        `   Qty: ${item.quantity}\n`;

                    message +=
                        `   Price: Rs. ${itemTotal.toLocaleString("en-PK")}\n`;

                });


                message +=
                    "\n*PAYMENT SUMMARY*\n";

                message +=
                    `Subtotal: Rs. ${subtotal.toLocaleString("en-PK")}\n`;

                message +=
                    `Delivery: Rs. ${delivery.toLocaleString("en-PK")}\n`;

                message +=
                    `*TOTAL: Rs. ${total.toLocaleString("en-PK")}*\n`;

                message +=
                    "\nThank you!";


                const whatsappURL =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       REVIEWS SLIDER
    ===================================================== */

    const reviewsSlider =
        document.getElementById(
            "reviewsSlider"
        );

    const reviewPrev =
        document.getElementById(
            "reviewPrev"
        );

    const reviewNext =
        document.getElementById(
            "reviewNext"
        );

    const reviewDots =
        document.getElementById(
            "reviewDots"
        );

    const reviewCards =
        reviewsSlider
            ? Array.from(
                reviewsSlider.querySelectorAll(
                    ".review-card"
                )
            )
            : [];


    let currentReviewIndex = 0;


    /* =====================================================
       VISIBLE REVIEWS
    ===================================================== */

    function getVisibleReviews() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1100) {
            return 2;
        }

        return 3;

    }


    /* =====================================================
       MAX REVIEW INDEX
    ===================================================== */

    function getReviewMaxIndex() {

        const visible =
            getVisibleReviews();

        return Math.max(
            0,
            reviewCards.length - visible
        );

    }


    /* =====================================================
       CREATE REVIEW DOTS
    ===================================================== */

    function createReviewDots() {

        if (!reviewDots) return;

        reviewDots.innerHTML = "";

        const maxIndex =
            getReviewMaxIndex();

        for (
            let i = 0;
            i <= maxIndex;
            i++
        ) {

            const dot =
                document.createElement(
                    "button"
                );

            dot.type = "button";

            dot.className =
                "review-dot";

            dot.setAttribute(
                "aria-label",
                `Go to review ${i + 1}`
            );


            if (
                i ===
                currentReviewIndex
            ) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                () => {

                    currentReviewIndex =
                        i;

                    updateReviews();

                }
            );


            reviewDots.appendChild(dot);

        }

    }


    /* =====================================================
       UPDATE REVIEWS
    ===================================================== */

    function updateReviews() {

        if (
            !reviewsSlider ||
            reviewCards.length === 0
        ) {
            return;
        }


        const visible =
            getVisibleReviews();

        const maxIndex =
            getReviewMaxIndex();


        if (
            currentReviewIndex >
            maxIndex
        ) {

            currentReviewIndex =
                maxIndex;

        }


        const viewport =
            reviewsSlider.parentElement;

        if (!viewport) return;


        const viewportWidth =
            viewport.clientWidth;

        const gap =
            visible === 1
                ? 0
                : 25;


        const cardWidth =
            (
                viewportWidth -
                gap * (visible - 1)
            ) / visible;


        const move =
            currentReviewIndex *
            (cardWidth + gap);


        reviewsSlider.style.transform =
            `translateX(-${move}px)`;


        if (reviewDots) {

            const dots =
                reviewDots.querySelectorAll(
                    ".review-dot"
                );

            dots.forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index ===
                        currentReviewIndex
                    );

                }
            );

        }

    }


    /* =====================================================
       NEXT REVIEW
    ===================================================== */

    if (reviewNext) {

        reviewNext.addEventListener(
            "click",
            () => {

                const maxIndex =
                    getReviewMaxIndex();


                if (
                    currentReviewIndex <
                    maxIndex
                ) {

                    currentReviewIndex++;

                } else {

                    currentReviewIndex = 0;

                }


                updateReviews();

            }
        );

    }


    /* =====================================================
       PREVIOUS REVIEW
    ===================================================== */

    if (reviewPrev) {

        reviewPrev.addEventListener(
            "click",
            () => {

                const maxIndex =
                    getReviewMaxIndex();


                if (
                    currentReviewIndex > 0
                ) {

                    currentReviewIndex--;

                } else {

                    currentReviewIndex =
                        maxIndex;

                }


                updateReviews();

            }
        );

    }


    /* =====================================================
       REVIEW RESPONSIVE
    ===================================================== */

    let reviewResizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                reviewResizeTimer
            );

            reviewResizeTimer =
                setTimeout(() => {

                    createReviewDots();
                    updateReviews();

                }, 150);

        }
    );


    if (reviewCards.length > 0) {

        createReviewDots();
        updateReviews();

    }


    /* =====================================================
       CONTACT FORM → WHATSAPP
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "contactName"
                    );

                const phoneInput =
                    document.getElementById(
                        "contactPhone"
                    );

                const messageInput =
                    document.getElementById(
                        "contactMessage"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const messageText =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                if (
                    !name ||
                    !phone ||
                    !messageText
                ) {

                    alert(
                        "Please fill in all contact fields."
                    );

                    return;
                }


                let message = "";

                message +=
                    "🍔 *THE BURGER — CONTACT MESSAGE*\n";

                message +=
                    "============================\n\n";

                message +=
                    `Name: ${name}\n`;

                message +=
                    `Phone: ${phone}\n\n`;

                message +=
                    "*MESSAGE*\n";

                message +=
                    `${messageText}\n`;


                const whatsappURL =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            closeCart();

            closeOrderModal();


            if (navbar) {
                navbar.classList.remove(
                    "active"
                );
            }


            if (menuToggle) {
                menuToggle.classList.remove(
                    "active"
                );
            }

        }
    );


    /* =====================================================
       INITIAL CART
    ===================================================== */

    updateCart();

});