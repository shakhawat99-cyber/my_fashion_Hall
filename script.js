let count = 0;
let total = 0;
let selectedItems = [];

function addToCart(productName, price) {
  count++;
  total += price;
  selectedItems.push(productName);

  document.getElementById('cart-count').innerText = count;
  document.getElementById('total-price').innerText = total.toLocaleString();

  alert(productName + ' কার্টে যোগ করা হয়েছে!');
}

function openCheckout() {
  if (count === 0) {
    alert('আপনার কার্ট খালি! অনুগ্রহ করে আগে ড্রেস নির্বাচন করুন।');
    return;
  }
  document.getElementById('modal-total').innerText = total.toLocaleString();
  document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
}

function processOrder(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  // ইমেইল নোটিফিকেশনে যে তথ্যগুলো তোমার কাছে যাবে
  const templateParams = {
    customer_name: name,
    customer_phone: phone,
    customer_address: address,
    ordered_items: selectedItems.join(', '),
    total_amount: total + ' BDT',
    payment_method: 'Cash on Delivery'
  };

  // EmailJS-এর মাধ্যমে জিমেইলে নোটিফিকেশন পাঠাবো
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function(response) {
       alert(`ধন্যবাদ ${name}!\nআপনার ক্যাশ অন ডেলিভারি অর্ডারটি সফল হয়েছে।\nআমরা শীঘ্রই ${phone} নম্বরে ফোন করে ঠিকানা কনফার্ম করে ডেলিভারি পাঠাবো।`);
       
       // কার্ট রিসেট
       count = 0;
       total = 0;
       selectedItems = [];
       document.getElementById('cart-count').innerText = count;
       document.getElementById('total-price').innerText = total;
       document.getElementById('order-form').reset();
       closeCheckout();
    }, function(error) {
       alert('অর্ডার পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
       console.log('FAILED...', error);
    });
}