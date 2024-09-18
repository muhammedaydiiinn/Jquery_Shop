$(function () {
    const card_header = $('.card-header').first(); // Ürünlerin başlığı
    const card_body = $('.card-body').first(); // Ürünlerin içeriği
    const cartContainer = $('#cart'); // Sepet içeriğini gösteren bölüm
    const totalPriceContainer = $('#total-price'); // Toplam fiyatı gösteren alan
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // LocalStorage'dan sepeti yükle
    let totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0; // LocalStorage'dan toplam fiyatı yükle
    let currentPage = 1; // Başlangıç sayfası
    const itemsPerPage = 5; // Sayfa başına gösterilecek ürün sayısı
    let totalPages = 1; // Toplam sayfa sayısı

    // LocalStorage'dan sepetteki ürünleri ve toplam fiyatı yükle
    function loadFromLocalStorage() {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
        updateCart(); // Sepeti güncelle
    }

    // API'den ürün bilgilerini çek
    $.getJSON('https://fakestoreapi.com/products', function (data) {
        card_header.html('<h4>Available Products</h4>');

        if (Array.isArray(data)) {
            totalPages = Math.ceil(data.length / itemsPerPage); // Toplam sayfa sayısını hesapla

            // İlk sayfayı yükle
            loadPage(data, currentPage);

            // Sayfa değişikliklerini dinle
            $('.pagination').on('click', 'button', function () {
                const action = $(this).data('action');
                if (action === 'next' && currentPage < totalPages) {
                    currentPage++;
                } else if (action === 'prev' && currentPage > 1) {
                    currentPage--;
                }
                loadPage(data, currentPage); // Yeni sayfayı yükle
            });
        } else {
            console.error('API response is not an array:', data);
        }
    });

    // Sayfa yükleme fonksiyonu
    function loadPage(data, page) {
        card_body.html(''); // Mevcut ürünleri temizle
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const productsToShow = data.slice(start, end);

        // Sayfadaki ürünleri göster
        productsToShow.forEach(function (product) {
            let productImage = product.image;

            let productCard = `
                <div class="card-product item mb-4">
                    <div class="card-header item">
                        <img src="${productImage}" class="img-fluid" alt="${product.title}" />
                    </div>
                    <div class="card-body item">
                        <h5>${product.title}</h5>
                        <p>Price: $${product.price}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            card_body.append(productCard);
        });

        // Sepete ürün ekleme
        $('.add-to-cart').on('click', function () {
            const productId = $(this).data('id');
            const product = data.find(p => p.id === productId);

            if (product) {
                addToCart(product);
                updateCart();
            }
        });

        // Sayfalama butonlarını güncelle
        updatePagination();
    }

    // Sepete ürün ekleme fonksiyonu
    function addToCart(product) {
        const existingProductIndex = cart.findIndex(p => p.id === product.id);
        
        if (existingProductIndex !== -1) {
            // Ürün zaten sepet içinde var, miktarını arttıralım
            cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
        } else {
            // Yeni ürün ekleyelim
            product.quantity = 1;
            cart.push(product);
        }

        totalPrice += product.price;
        // LocalStorage'a kaydet
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    }

    // Sepet güncelleme fonksiyonu
    function updateCart() {
        if (cart.length === 0) {
            cartContainer.html('<p>No items in the cart.</p>');
            totalPrice = 0; // Toplam fiyatı sıfırla
            totalPriceContainer.html(totalPrice.toFixed(2)); // Toplam fiyatı güncelle
        } else {
            cartContainer.html('');
    
            cart.forEach(function (item, index) {
                let cartItem = `
                    <div class="cart-item mb-2">
                        <h5>${item.title}</h5>
                        <p>Price: $${item.price} x ${item.quantity}</p>
                        <button class="btn btn-danger remove-from-cart" data-index="${index}">Remove</button>
                    </div>
                `;
                cartContainer.append(cartItem);
            });
    
            totalPriceContainer.html(totalPrice.toFixed(2)); // Toplam fiyatı güncelle
        }
    
        // Ürün silme butonuna tıklayınca miktarı azalt
        $('.remove-from-cart').on('click', function () {
            const itemIndex = $(this).data('index');
            const removedItem = cart[itemIndex];
    
            if (removedItem) {
                // Ürünün miktarı 1'den fazlaysa azalt
                if (removedItem.quantity > 1) {
                    removedItem.quantity -= 1;
                    totalPrice -= removedItem.price; // Toplam fiyattan ürünün fiyatını çıkar
                } else {
                    // Ürünün miktarı 1 ise ürünü sepetten çıkar
                    totalPrice -= removedItem.price * removedItem.quantity;
                    cart.splice(itemIndex, 1);
                }
                updateCart(); // Sepeti yeniden güncelle

                // LocalStorage'dan sepeti ve toplam fiyatı güncelle
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
            }
        });
    }

    // Sayfalama butonlarını güncelleme fonksiyonu
    function updatePagination() {
        const paginationControls = `
            <button class="btn btn-secondary btn-sm" style="margin-right: 10px;" data-action="prev" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
            <span class="mr-3" style="margin-right: 10px;">   Page ${currentPage} of ${totalPages}   </span>
            <button class="btn btn-secondary btn-sm" data-action="next" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
        `;
        $('.pagination').html(paginationControls);
    }

    // Sayfa yüklendiğinde verileri localStorage'dan yükle
    loadFromLocalStorage();
});
