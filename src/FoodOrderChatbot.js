import React, { useState, useEffect, useRef } from 'react';
import './FoodOrderChatbot.css';

const FoodOrderChatbot = () => {
  const [messages, setMessages] = useState([
    { 
        text: "Welcome to FoodExpress! How can I help you today?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {year: 'numeric',
        month: 'numeric', 
        day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [menuItems] = useState([
    { id: 1, name: "Cheeseburger", price: 8.99, category: "burgers", locationId: 1 },
    { id: 2, name: "Veggie Burger", price: 7.99, category: "burgers", locationId: 1 },
    { id: 3, name: "Pepperoni Pizza", price: 12.99, category: "pizza", locationId: 1 },
    { id: 4, name: "Westside Special Burger", price: 9.99, category: "burgers", locationId: 2 },
    { id: 5, name: "BBQ Chicken Pizza", price: 13.99, category: "pizza", locationId: 2 },
    { id: 6, name: "Express Breakfast Sandwich", price: 6.99, category: "breakfast", locationId: 3 }
  ]);
const [restaurantInfo] = useState([
    {
      id: 1,
      name: "FoodExpress Downtown",
      address: "123 Main Street, Foodville, FC 12345",
      phone: "(555) 123-4567",
      hours: {
        Monday: "11:00 AM - 10:00 PM",
        Tuesday: "11:00 AM - 10:00 PM",
        Wednesday: "11:00 AM - 10:00 PM",
        Thursday: "11:00 AM - 10:00 PM",
        Friday: "11:00 AM - 11:00 PM",
        Saturday: "10:00 AM - 11:00 PM",
        Sunday: "10:00 AM - 9:00 PM"
      },
      deliveryOptions: ["Uber Eats", "DoorDash", "Grubhub"],
      menuItems: [
        { id: 1, name: "Downtown Cheeseburger", price: 9.99, category: "burgers" },
        { id: 2, name: "Gourmet Pizza", price: 14.99, category: "pizza" },
        { id: 3, name: "Craft Beer", price: 6.99, category: "drinks" }
      ],
      about: "Our flagship location in downtown Foodville with a full menu and bar."
    },
    {
      id: 2,
      name: "FoodExpress Westside",
      address: "456 Oak Avenue, West Foodville, FC 67890",
      phone: "(555) 987-6543",
      hours: {
        Monday: "11:00 AM - 9:00 PM",
        Tuesday: "11:00 AM - 9:00 PM",
        Wednesday: "11:00 AM - 9:00 PM",
        Thursday: "11:00 AM - 9:00 PM",
        Friday: "11:00 AM - 10:00 PM",
        Saturday: "10:00 AM - 10:00 PM",
        Sunday: "10:00 AM - 8:00 PM"
      },
      deliveryOptions: ["Uber Eats", "DoorDash"],
      menuItems: [
        { id: 4, name: "Westside Burger", price: 8.99, category: "burgers" },
        { id: 5, name: "BBQ Chicken Pizza", price: 13.99, category: "pizza" },
        { id: 6, name: "Local Wine", price: 7.99, category: "drinks" }
      ],
      about: "Our cozy Westside location with a focus on quick service and takeout."
    },
    {
      id: 3,
      name: "FoodExpress Airport",
      address: "789 Terminal Road, Foodville International Airport",
      phone: "(555) 456-7890",
      hours: {
        Monday: "5:00 AM - 11:00 PM",
        Tuesday: "5:00 AM - 11:00 PM",
        Wednesday: "5:00 AM - 11:00 PM",
        Thursday: "5:00 AM - 11:00 PM",
        Friday: "5:00 AM - 11:00 PM",
        Saturday: "5:00 AM - 11:00 PM",
        Sunday: "5:00 AM - 11:00 PM"
      },
      deliveryOptions: [],
      menuItems: [
        { id: 7, name: "Express Breakfast", price: 6.99, category: "breakfast" },
        { id: 8, name: "Grab & Go Sandwich", price: 5.99, category: "sandwiches" }
      ],
      about: "Airport location with quick service options for travelers."
    }
]);
  const [checkoutStage, setCheckoutStage] = useState('cart'); // 'cart', 'payment', 'confirmation'
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  const paymentOptions = [
    { id: 1, name: "Credit/Debit Card", icon: "💳" },
    { id: 2, name: "PayPal", icon: "🔵" },
    { id: 3, name: "Cash on Delivery", icon: "💵" },
    { id: 4, name: "Google Pay", icon: "G" },
    { id: 5, name: "Apple Pay", icon: "🍏" }
  ];
  const [orderStage, setOrderStage] = useState('building'); // 'building', 'delivery', 'payment', 'confirmation'
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [itemStage, setItemStage] = useState('searching'); //
  const deliveryOptions = [
    { 
      id: 1, 
      name: "Delivery", 
      icon: "🚚",
      fee: 2.99,
      description: "Get your food delivered to your door"
    },
    { 
      id: 2, 
      name: "Pickup", 
      icon: "🏃",
      fee: 0,
      description: "Pick up your order at the restaurant"
    },
    { 
      id: 3, 
      name: "Curbside", 
      icon: "🚗",
      fee: 0,
      description: "We'll bring it to your car"
    }
  ];
  const [currentRestaurantId, setCurrentRestaurantId] = useState(1);
  const currentRestaurant = restaurantInfo.find(r => r.id === currentRestaurantId);
 // const currentMenuItems = menuItems.filter(item => item.locationId === currentRestaurant);
  
  //const [currentRestaurant, setCurrentRestaurant] = useState(1);
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [foodItem, setFoodItem] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [isHindi, setIsHindi] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en-US');
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
        year: 'numeric',
        month: 'numeric', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit' 
      });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
const detectedHindi = isHindiText(inputValue);
    setIsHindi(detectedHindi);
    // Add user message
    const userMessage = { text: inputValue, sender: "user", timestamp: getCurrentTime() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Process user input after a short delay
    setTimeout(() => {
      processUserInput(inputValue);
    }, 500);
  };

  const processUserInput = async (input) => {
    const lowerInput = input.toLowerCase();

     if (orderStage === 'delivery') {
    processDeliverySelection(input);
    return;
  }


    if (checkoutStage === 'payment') {
    processPaymentSelection(input);
    return;
  }
  
  setIsHindi(false);

    

    if (lowerInput.includes("do you have") || lowerInput.includes("What about") || lowerInput.includes("find")) {
      await  simulateTyping("Let me show you our menu...", 800);
      checkItemName(input)
      //  showMenu();
    } else  if (lowerInput.includes("restaurant") || 
        lowerInput.includes("location") || 
        lowerInput.includes("about") || 
        lowerInput.includes("info") ||
        lowerInput.includes("locations")) {
      
      if (lowerInput.includes("all") || lowerInput.includes("list") || lowerInput.includes("locations")) {
       await simulateTyping("Let me show you all our locations...", 800).then(() => showAllRestaurants());
      } else if (lowerInput.includes("tell me about") || lowerInput.includes("Restaurant about") || lowerInput.includes("Restaurant info")) {
       await simulateTyping("Looking up that location...", 800).then(() => handleLocationRequest(input));
      } else {
       await simulateTyping(`Here's information about our ${currentRestaurant.name} location...`, 800)
          .then(() => showRestaurantInfo());
      }
    } else if (lowerInput.includes("restaurant menu") || lowerInput.includes("show restaurant full menu") || lowerInput.includes("show full menu") || lowerInput.includes("show menu") || lowerInput.includes("menu")) {
      await simulateTyping(`Getting ${currentRestaurant.name}'s menu...`, 800)
        .then(() => showRestaurantMenu(currentRestaurant));
    } else if (lowerInput.includes("order") || lowerInput.includes("want to buy")) {
         await simulateTyping("Processing your order...");
         const currentRestaurant1 = restaurantInfo.find(r => r.id === currentRestaurantId);
    currentRestaurant1.menuItems.forEach(item => {
      if (lowerInput.includes(item.name.toLowerCase())) {
        addToOrder(item.id);
      }
    });
      //  handleOrderIntent(input);
    } else if (lowerInput.includes("cart") || lowerInput.includes("my order") || lowerInput.includes("show my order") || lowerInput.includes("show cart")) {
        await simulateTyping("Let me check your cart...", 800);
        //showCart();
        showOrder();
    } else if (lowerInput.includes("checkout") || lowerInput.includes("place order")) {
        await simulateTyping("Preparing your order...");
       // checkout();
       proceedToDeliveryOptions();
    } else if (lowerInput.includes("remove") && (lowerInput.includes("from order") || lowerInput.includes("from cart"))) {
        await simulateTyping("Removing item from your order...");
        //handleRemoveItem(input);
        handleRemoveCommand(input); 
    } else if (lowerInput.includes("buy from")) {
      await simulateTyping("Processing New Order...");
       const orderFromMatch = input.match(/buy from (.+)/i);
      if (orderFromMatch) {
        const restaurantName = orderFromMatch[1];
        handleOrderFromRestaurant(restaurantName, foodItem);
        return;
      }
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      addBotMessage("Hello! How can I help you with your food order today?");
    } else if (lowerInput.includes("switch to")) {
      handleLocationSwitch(input);
    }  else if (lowerInput.includes("thank")) {
      addBotMessage("You're welcome! Is there anything else I can help you with?");
    } else if (lowerInput.includes('help')) {
addBotMessage("Here are some commands you can use:\n\n" +
      "• 'Show menu' - View all items\n" +
      "• 'Order pizza' - Add pizza to cart\n" +
      "• 'Show cart' - View your order\n" +
      "• 'Checkout' - Proceed to payment\n\n" +
      "See the commands panel (💡 icon) for more options!");
    return;
    } else {
      const isHindi = isHindiText(input);
  setIsHindi(isHindi); // Save to state if needed

  if (isHindi) {
    // Handle Hindi input
    handleHindiInput(input);
  } else {
     await simulateTyping("Let me think about that...");
      addBotMessage("I'm here to help you order food. You can ask for our menu, add items to your order, or checkout.");
    const allMenuItems = restaurantInfo.flatMap(r => r.menuItems);
  const mentionedItem = allMenuItems.find(item => 
    input.toLowerCase().includes(item.name.toLowerCase())
  );

      if (mentionedItem) {
        showItemAvailability(mentionedItem.name);
        setFoodItem(mentionedItem.name);
        addBotMessage("You can say 'Buy from [restaurant name]' to add items to your cart.")
        return;
      }
     }
    }
  };

  const simulateTyping = (response, delay = 1500) => {
    setIsTyping(true);
    
    return new Promise(resolve => {
      setTimeout(() => {
        addBotMessage(response);
        setIsTyping(false);
        resolve();
      }, delay);
    });
  };

  const addBotMessage = (text) => {
    const responseText = isHindi 
    ? generateHindiResponse(text) 
    : text;
      setMessages(prev => [...prev, { text, sender: "bot", timestamp: getCurrentTime() }]);
      speak(text);  
    };

  const showMenu = () => {
    let menuText = "Here's our menu:\n";
    const categories = [...new Set(currentRestaurant.menuItems.map(item => item.category))];
    
    categories.forEach(category => {
      menuText += `\n${category.charAt(0).toUpperCase() + category.slice(1)}:\n`;
      currentRestaurant.menuItems
        .filter(item => item.category === category)
        .forEach(item => {
          menuText += `- ${item.name}: $${item.price.toFixed(2)}\n`;
        });
    });
    
    menuText += "\nYou can say 'I'd like to order [item name]' to add items to your cart.";
    addBotMessage(menuText);
  };

  const handleOrderIntent = (input) => {
    const lowerInput = input.toLowerCase();
    const orderedItems = [];
    
    currentRestaurant.menuItems.forEach(item => {
      if (lowerInput.includes(item.name.toLowerCase())) {
        orderedItems.push(item);
      }
    });
    
    if (orderedItems.length > 0) {
      orderedItems.forEach(item => {
        setOrder(prev => [...prev, 
            item,
        ]);
        addBotMessage(`Added ${item.name} to your order.`);
      });
    } else {
      addBotMessage("I'm not sure what you'd like to order. Please specify the item name from our menu.");
    }
  }; 

  const addToOrder = (itemId) => { 
    const currentRestaurant1 = restaurantInfo.find(r => r.id === currentRestaurantId);
    const menuItem = currentRestaurant1.menuItems.find(item => item.id === itemId);
    
    if (menuItem) {
      setOrder([...order, {
        ...menuItem,
        locationId: currentRestaurantId, // Store location ID with order
        restaurantName: currentRestaurant1.name // For display purposes
      }]);
      addBotMessage(`Added ${menuItem.name} ($${menuItem.price.toFixed(2)}) to your ${currentRestaurant1.name} order.`);
    }
  };

  const showCart = () => {
    if (order.length === 0) {
      addBotMessage("Your cart is currently empty.");
      return;
    }
    
    let cartText = "Your current order:\n";
    const itemCounts = {};
    let total = 0;
    
    order.forEach(item => {
      itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
    });
    
    Object.keys(itemCounts).forEach(id => {
      const item = currentRestaurant.menuItems.find(i => i.id === parseInt(id));
      const quantity = itemCounts[id];
      const itemTotal = quantity * item.price;
      cartText += `- ${quantity}x ${item.name}: $${itemTotal.toFixed(2)}\n`;
      total += itemTotal;
    });
    
    cartText += `\nTotal: $${total.toFixed(2)}\n`;
    cartText += "You can say 'remove [item name] from order' to remove items, or 'checkout' to place your order.";
    addBotMessage(cartText);
  }; 

  const showOrder = () => {
    if (order.length === 0) {
      addBotMessage("Your order is currently empty.");
      return;
    }

    let orderText = `Your current order:\n\n`;
    
    // Group items by location
    const locations = [...new Set(order.map(item => item.locationId))];
    
    locations.forEach(locationId => {
      const location = restaurantInfo.find(r => r.id === locationId);
      const locationItems = order.filter(item => item.locationId === locationId);
      
      orderText += `📍 ${location.name} Location:\n`;
      locationItems.forEach((item, index) => {
        orderText += `- ${item.name}: $${item.price.toFixed(2)} (${index + 1})\n`;
      });
      
      const locationTotal = locationItems.reduce((sum, item) => sum + item.price, 0);
      orderText += `Subtotal: $${locationTotal.toFixed(2)}\n\n`;
    });

    // Calculate grand total
    const grandTotal = order.reduce((sum, item) => sum + item.price, 0);
    orderText += `💳 Grand Total: $${grandTotal.toFixed(2)}\n\n`;
    
    orderText += `You can:\n`;
    orderText += `- Say "remove [number]" to remove items\n`;
    orderText += `- Say "checkout" to place your order\n`;
    orderText += `- Say "switch to [location]" to change restaurants`;

    addBotMessage(orderText);
  };

  const handleRemoveItem = (input) => {
    const lowerInput = input.toLowerCase();
    const itemToRemove = currentRestaurant.menuItems.find(item => 
      lowerInput.includes(item.name.toLowerCase())
    );
    
    if (itemToRemove) {
      const itemIndex = order.findIndex(item => item.id === itemToRemove.id);
      if (itemIndex !== -1) {
        const newOrder = [...order];
        newOrder.splice(itemIndex, 1);
        setOrder(newOrder);
        addBotMessage(`Removed ${itemToRemove.name} from your order.`);
      } else {
        addBotMessage(`You don't have ${itemToRemove.name} in your order.`);
      }
    } else {
      addBotMessage("I'm not sure which item you want to remove. Please specify the item name.");
    }
  };

  const handleRemoveCommand = (input) => {
    const match = input.match(/remove\s+(\d+)/i);
    if (match) {
      const index = parseInt(match[1]) - 1;
      if (index >= 0 && index < order.length) {
        const removedItem = order[index];
        const newOrder = order.filter((_, i) => i !== index);
        setOrder(newOrder);
        addBotMessage(`Removed ${removedItem.name} from your ${removedItem.restaurantName} order.`);
      } else {
        addBotMessage("Please specify a valid item number from your order.");
      }
    } else {
      addBotMessage("I'm not sure which item you want to remove. Please specify the item name.");
    }
  };

  const checkout1 = () => {
    if (order.length === 0) {
      addBotMessage("Your cart is empty. Please add some items before checking out.");
      return;
    }
    
    let checkoutText = "Your order has been placed!\n\nOrder summary:\n";
    const itemCounts = {};
    let total = 0;
    
    order.forEach(item => {
      itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
    });
    
    Object.keys(itemCounts).forEach(id => {
      const item = currentRestaurant.menuItems.find(i => i.id === parseInt(id));
      const quantity = itemCounts[id];
      const itemTotal = quantity * item.price;
      checkoutText += `- ${quantity}x ${item.name}: $${itemTotal.toFixed(2)}\n`;
      total += itemTotal;
    });
    
    checkoutText += `\nTotal: $${total.toFixed(2)}\n`;
    checkoutText += "Estimated delivery time: 30-45 minutes. Thank you for your order!";
    
    addBotMessage(checkoutText);
    setOrder([]);
  }; 

  const checkout = () => {
  if (order.length === 0) {
    addBotMessage("Your order is empty. Please add some items before checkout.");
    return;
  }

  setCheckoutStage('payment');
  showPaymentOptions();

  // Group orders by location
 /* const ordersByLocation = restaurantInfo.map(location => ({
    location: location.name,
    items: order.filter(item => item.locationId === location.id),
    total: order.filter(item => item.locationId === location.id)
               .reduce((sum, item) => sum + item.price, 0)
  })).filter(loc => loc.items.length > 0);

  let checkoutText = "Your order has been placed!\n\n";
  let total = 0;
  
  ordersByLocation.forEach(loc => {
    checkoutText += `📍 ${loc.location} Order:\n`;
    loc.items.forEach(item => {
      checkoutText += `- ${item.name}: $${item.price.toFixed(2)}\n`;
    });
    checkoutText += `Total: $${loc.total.toFixed(2)}\n\n`;
    total += loc.total.toFixed(2);
  });

  checkoutText += `Total order amount: $${total.toFixed(2)}\n`;

  checkoutText += `Estimated delivery/pickup time: 30-45 minutes\n`;
  checkoutText += `Thank you for your order!`;

  addBotMessage(checkoutText);
  setOrder([]);  */

};

const showPaymentOptions = () => {
  let paymentText = "Please select your payment method:\n\n";
  
  paymentOptions.forEach((option, index) => {
    paymentText += `${index + 1}. ${option.icon} ${option.name}\n`;
  });
  
  paymentText += "\nReply with the number of your preferred payment method.";
  
  addBotMessage(paymentText);
};

const processPaymentSelection = (input) => {
  const paymentNumber = parseInt(input);
  if (paymentNumber >= 1 && paymentNumber <= paymentOptions.length) {
    const selected = paymentOptions[paymentNumber - 1];
    setSelectedPayment(selected);
    confirmOrder(selected);
  } else {
    addBotMessage("Please select a valid payment option (1-5).");
    showPaymentOptions();
  }
};

const confirmOrder = (paymentMethod) => {
  setCheckoutStage('confirmation');
  
  // Calculate totals
  const ordersByLocation = restaurantInfo.map(location => ({
    location: location.name,
    items: order.filter(item => item.locationId === location.id),
    total: order.filter(item => item.locationId === location.id)
               .reduce((sum, item) => sum + item.price, 0)
  })).filter(loc => loc.items.length > 0);

  let confirmText = "✅ Order Confirmed!\n\n";
  let total = 0;
  // Order summary
  confirmText += "📦 Your Order:\n";
  ordersByLocation.forEach(loc => {
    confirmText += `📍 ${loc.location}:\n`;
    loc.items.forEach(item => {
      confirmText += `- ${item.name}: $${item.price.toFixed(2)}\n`;
    });
    confirmText += `Total: $${loc.total.toFixed(2)}\n\n`;
    total += loc.total.toFixed(2); 
  });

  confirmText += `Total order amount: $${total}\n\n`;

if (selectedDelivery && selectedDelivery.fee > 0) {
    confirmText += `🚚 Delivery Fee: $${selectedDelivery.fee.toFixed(2)}\n`;
  }
  // Delivery info
  confirmText += `📦 Delivery Method: ${selectedDelivery ? selectedDelivery.name + " " + selectedDelivery.icon : "Not selected yet"}`;
  // Payment info
  confirmText += `💳 Payment Method: ${paymentMethod.name} ${paymentMethod.icon}\n`;
  confirmText += `🕒 Estimated delivery time: 30-45 minutes\n\n`;
  confirmText += `Thank you for your order! A confirmation has been sent to your email.`;
   
  addBotMessage(confirmText);
  setOrder([]); // Clear cart
  setCheckoutStage('cart');
};


const proceedToDeliveryOptions = () => {
  if (order.length === 0) {
    addBotMessage("Your order is empty. Please add some items first.");
    return;
  }

  setOrderStage('delivery');
  showDeliveryOptions();
};

  const showDeliveryOptions = () => {
  let deliveryText = "How would you like to receive your order?\n\n";
  
  deliveryOptions.forEach((option, index) => {
    const feeText = option.fee > 0 ? `(+$${option.fee.toFixed(2)})` : "";
    deliveryText += `${index + 1}. ${option.icon} ${option.name} ${feeText}\n`;
    deliveryText += `   ${option.description}\n\n`;
  });
  
  deliveryText += "Please reply with the number of your preferred delivery method.";
  
  addBotMessage(deliveryText);
};

const processDeliverySelection = (input) => {
  const optionNumber = parseInt(input);
  if (optionNumber >= 1 && optionNumber <= deliveryOptions.length) {
    const selected = deliveryOptions[optionNumber - 1];
    setSelectedDelivery(selected);
    
    // Update order with delivery fee if applicable
    if (selected.fee > 0) {
      const deliveryFeeItem = {
        id: 999,
        name: `${selected.name} Fee`,
        price: selected.fee,
        locationId: currentRestaurantId,
        restaurantName: currentRestaurant.name,
        isFee: true
      };
      setOrder([...order, deliveryFeeItem]);
    }
    
    proceedToPayment();
  } else {
    addBotMessage("Please select a valid delivery option (1-3).");
    showDeliveryOptions();
  }
};

const proceedToPayment = () => {
  setOrderStage('payment');
  checkout();
 // showPaymentOptions();
};


  const showRestaurantInfo = (restaurant = currentRestaurant) => {
    let infoText = `🍴 ${restaurant.name}\n\n`;
    infoText += `📍 ${restaurant.address}\n`;
    infoText += `📞 ${restaurant.phone}\n\n`;
    infoText += `🕒 Hours:\n`;
    
    Object.entries(restaurant.hours).forEach(([day, hours]) => {
      infoText += `${day}: ${hours}\n`;
    });
    
    // Show 3 popular menu items as preview
    const popularItems = restaurant.menuItems.slice(0, 3);
    infoText += `\n🍟 Popular Items:\n`;
    popularItems.forEach(item => {
      infoText += `- ${item.name} ($${item.price.toFixed(2)})\n`;
    });
    
    infoText += `\nType "show full menu" to see all offerings at this location.`;
    addBotMessage(infoText);
  };

  const showAllRestaurants = () => {
    let infoText = `We have ${restaurantInfo.length} locations:\n\n`;
    
    restaurantInfo.forEach((restaurant, index) => {
      infoText += `${index + 1}. ${restaurant.name}\n`;
      infoText += `   📍 ${restaurant.address}\n`;
      infoText += `   📞 ${restaurant.phone}\n`;
      
      // Show today's hours
      const today = new Date().toLocaleString('en-us', { weekday: 'long'});
      infoText += `   🕒 Today (${today}): ${restaurant.hours[today] || 'Closed'}\n\n`;
    });
    
    infoText += `You can ask about a specific location by saying "tell me about [location name]"`;
    addBotMessage(infoText);
  };

  const handleLocationRequest = async (input) => {
    const lowerInput = input.toLowerCase();
    const requestedRestaurant = restaurantInfo.find(r => 
      lowerInput.includes(r.name.toLowerCase())
    );

    if (requestedRestaurant) {
      await simulateTyping(`Switching to ${requestedRestaurant.name}...`);
      setCurrentRestaurantId(requestedRestaurant.id);
      
      // Show both info and menu for the new location
      showRestaurantInfo(requestedRestaurant);
      await simulateTyping("Getting the menu...", 800);
      showRestaurantMenu(requestedRestaurant);
    } else {
      addBotMessage("I couldn't find that location. Here are all our locations:");
      showAllRestaurants();
    }
  };

  const showRestaurantMenu = (restaurant) => {
    let menuText = `Menu for ${restaurant.name}:\n\n`;
    
    const categories = [...new Set(restaurant.menuItems.map(item => item.category))];
    
    categories.forEach(category => {
      menuText += `🍽️ ${category.toUpperCase()}:\n`;
      restaurant.menuItems
        .filter(item => item.category === category)
        .forEach(item => {
          menuText += `- ${item.name}: $${item.price.toFixed(2)}\n`;
        });
      menuText += `\n`;
    });
    
    menuText += `You can say "order [item name]" to add items to your cart.`;
    addBotMessage(menuText);
  };

  const handleLocationSwitch = (input) => {
  const lowerInput = input.toLowerCase();
  const newLocation = restaurantInfo.find(r => 
    lowerInput.includes(r.name.toLowerCase())
  );

  if (newLocation) {
    setCurrentRestaurantId(newLocation.id);
    addBotMessage(`Switched to ${newLocation.name} location. What would you like to order?`);
    // Show menu for new location
   // showMenu(newLocation);
   showRestaurantMenu(newLocation)
  } else {
    let response = "Available locations:\n";
    restaurantInfo.forEach(loc => {
      response += `- ${loc.name}\n`;
    });
    addBotMessage(response);
  }
};

const handleOrderFromRestaurant = (restaurantName, originalInput) => {
  const restaurant = restaurantInfo.find(r => 
    r.name.toLowerCase().includes(restaurantName.toLowerCase())
  );

  if (!restaurant) {
    addBotMessage(`Couldn't find restaurant "${restaurantName}". Try one of these:\n${
      restaurantInfo.map(r => `- ${r.name}`).join('\n')
    }`);
    return;
  }

  // Set current location
  setCurrentRestaurantId(restaurant.id);
  
  // Extract item name from original input if possible
  const allItems = restaurant.menuItems.map(item => item.name.toLowerCase());
  const mentionedItem = allItems.find(itemName => 
    originalInput.toLowerCase().includes(itemName)
  );

  if (mentionedItem) {
    const menuItem = restaurant.menuItems.find(
      item => item.name.toLowerCase() === mentionedItem
    );
    addToOrder(menuItem.id);
    //addBotMessage(`Added ${menuItem.name} from ${restaurant.name} to your order!`);
  } else {
    addBotMessage(`Now ordering from ${restaurant.name}. What would you like?`);
    showRestaurantMenu(restaurant);
  }
};

const searchItemAcrossRestaurants = (itemName) => {
  const lowerItemName = itemName.toLowerCase();
  const results = [];

  restaurantInfo.forEach(restaurant => {
    restaurant.menuItems.forEach(menuItem => {
      if (menuItem.name.toLowerCase().includes(lowerItemName)) {
        results.push({
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          item: menuItem
        });
      }
    });
  });

  return results;
};

const showItemAvailability = (itemName) => {
  const foundItems = searchItemAcrossRestaurants(itemName);

  if (foundItems.length === 0) {
    addBotMessage(`Sorry, we couldn't find "${itemName}" at any of our restaurants.`);
    return;
  }

  let responseText = `Here's where you can get "${itemName}":\n\n`;
  foundItems.forEach((result, index) => {
    responseText += `${index + 1}. ${result.restaurantName}\n`;
    responseText += `   - ${result.item.name}: $${result.item.price.toFixed(2)}\n`;
    responseText += `   - Type "order from ${result.restaurantName}" to select\n\n`;
});

  responseText += "You can also ask about other menu items!";
  addBotMessage(responseText);
  setFoodItem(itemName);
};

const  checkItemName = (input) => {

     const allMenuItems = restaurantInfo.flatMap(r => r.menuItems);
      
     const mentionedItem = allMenuItems.find(item => 
        input.toLowerCase().includes(item.name.toLowerCase())
     );

     if (mentionedItem) {
         showItemAvailability(mentionedItem.name);
         addBotMessage("You can say 'Buy from [restaurant name]' to add items to your cart.")
        return;
     }
};

   const Message = ({ text, sender, timestamp }) => {
  // Calculate approximate line count (assuming ~40 chars per line)
  const lineCount = text.length / 40;
  
  // Determine width based on content length
  const messageWidth = lineCount < 2 ? 'fit-content' : 
                      lineCount < 4 ? '70%' : '85%';

  return (
    <div className={`message-container ${sender}`}>
      <div 
        className={`message ${sender}`}
        style={{ maxWidth: messageWidth }}
      >
        {text.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      <div className="message-timestamp">
        {timestamp}
      </div>
    </div>
  );
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) || !('speechSynthesis' in window)) {
      setVoiceSupported(false);
      return;
    }

    // Initialize speech recognition
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'hi-IN, en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const detectedLang = event.results[0][0].lang; 
      setDetectedLanguage(detectedLang);
    setIsHindi(detectedLang.includes('hi-IN'));
    const responseTranscript = isHindi 
    ? generateHindiResponse(transcript) 
    : transcript;
      processUserInput(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

    const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
      }
    }
  };

  const speak = (text) => {
    if (!synthRef.current) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    synthRef.current.speak(utterance);
  };

  const generateHindiResponse = (englishText) => {
  const translations = {
    "Hello": "नमस्ते",
    "What would you like to order?": "आप क्या ऑर्डर करना चाहेंगे?",
    "Your order has been placed": "आपका ऑर्डर प्लेस हो गया है",
    // Add more translations as needed
  };
  
  return translations[englishText] || englishText;
};

const toggleLanguage = () => {
  setPreferredLanguage(prev => prev === 'en-US' ? 'hi-IN' : 'en-US');
};

const isHindiText = (text) => {
  // Regular expression to match Hindi characters (Unicode range for Devanagari)
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text);
};

const LanguageIndicator = ({ isHindi }) => {
  return (
    <div className={`language-indicator ${isHindi ? 'hindi' : 'english'}`}>
      {isHindi ? 'हिंदी' : 'English'}
    </div>
  );
};

const handleHindiInput = (hindiText) => {
  // Simple translation dictionary (would need to be expanded)
  const responseMap = {
    "नमस्ते": "नमस्ते! आपकी क्या सहायता कर सकता हूँ?",
    "मेनू": "हमारे मेनू में ये विकल्प उपलब्ध हैं...",
    "धन्यवाद": "आपका स्वागत है!"
  };

  const response = responseMap[hindiText] || 
    "मैं अभी पूरी तरह से हिंदी नहीं समझ पा रहा हूँ। कृपया अंग्रेज़ी में लिखें।";
  
  addBotMessageHindi(response);
};


const addBotMessageHindi = (text) => {
 // const responseText = generateHindiResponse(text);

  const newMessage = {
    text: text,
    sender: 'bot',
    timestamp: getCurrentTime
  };
  
  setMessages(prev => [...prev, newMessage]);
  speakHindi(text);
};

const speakHindi = (text) => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }

  const synth = window.speechSynthesis;
  
  // Cancel any ongoing speech
  synth.cancel();

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language based on detection
  utterance.lang = 'hi-IN';
  
  // Configure voice preferences
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to find an appropriate voice


  // Speak the text
  synth.speak(utterance);
};

/*  useEffect(() => {
    setMessages([
      { 
        text: `Welcome to ${currentRestaurant.name}! How can I help you today?`, 
        sender: "bot",
        timestamp: getCurrentTime()
      }
    ]);
  }, [currentRestaurantId]); */

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header" onClick={() => setIsMinimized(!isMinimized)}>
        <h3>FoodExpress Bot</h3>
        <button className="minimize-btn">
          {isMinimized ? '+' : '-'}
        </button>
      </div>
      
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <>
              <Message 
            key={index} 
            text={message.text} 
            sender={message.sender} 
            timestamp={message.timestamp}
          />
             {/* <div key={index} className={`message-container ${message.sender}`}>
                <div className={`message ${message.sender}`}>
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
                <div className="message-timestamp">
                  {message.timestamp}
                </div>
              </div>  */}
             </>
            ))}
            {isTyping && (
              <div className="message-container bot">
                <div className="message bot typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isHindi ? "संदेश लिखें..." : "Type a message..."}
            />
            <button onClick={handleSendMessage}>
              {isHindi ? "भेजें" : "Send"}
            </button>
          </div>
        </>
      )}
      <LanguageIndicator isHindi={isHindi} />
      <div className="voice-controls">
        {voiceSupported ? (
          <button 
            onClick={toggleListening}
            className={`voice-button ${isListening ? 'listening' : ''}`}
            disabled={isListening}
          >
            {isListening ? (
              <span className="pulse-animation">🎤 Listening...</span>
            ) : (
              '🎤 Speak'
            )}
          </button>
        ) : (
          <div className="voice-warning">
            Voice features not supported in your browser
          </div>
        )}
        
        <button 
          onClick={() => speak(messages[messages.length - 1]?.text || '')}
          className="voice-button"
          disabled={messages.length === 0}
        >
          🔄 Repeat Last
        </button>
        <div className="language-info">
      {detectedLanguage && (
        <div className={`language-tag ${isHindi ? 'hindi' : 'english'}`}>
          {isHindi ? 'हिंदी (Hindi)' : 'English'} detected
        </div>
      )}
    </div> 
    <button 
  onClick={toggleLanguage}
  className="language-toggle"
>
  {preferredLanguage === 'en-US' ? 'Switch to Hindi' : 'हिंदी से अंग्रेज़ी'}
</button>
      </div>
    </div>
  );
};

export default FoodOrderChatbot;