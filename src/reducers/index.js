const initialState = {
    menu: [],
    items:[],
    loading: true,
    error: false,
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true
            };
        case 'MENU_ERROR':
            return {
                ...state,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const cartItem = state.items.find(item => item.id === id);
            if(cartItem) {
                cartItem.number++;
                const cartItemIndex = state.items.findIndex(item => item.id === cartItem.id);
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0,cartItemIndex),
                        cartItem,
                        ...state.items.slice(cartItemIndex + 1)
                    ],
                    total: state.total + cartItem.price 
                }
            } else {
                const newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    number: 1
                }
                return {
                    ...state,
                    items: [
                        ...state.items, newItem
                    ],
                    total: state.total + newItem.price 
                }
            };
            
        case 'ITEM_REMOVE_FROM_CART':
                const idx = action.payload;
                const itemIndex = state.items.findIndex(item => item.id === idx);
                const delItem = state.items[itemIndex];
                if(delItem.number === 1) {
                    return {
                        ...state,
                        items: [
                            ...state.items.slice(0,itemIndex),
                            ...state.items.slice(itemIndex + 1)
                        ],
                        total: state.total - delItem.price 
                    }
                } else {
                    delItem.number--;
                    return {
                        ...state,
                        items: [
                            ...state.items.slice(0,itemIndex),
                            delItem,
                            ...state.items.slice(itemIndex + 1)
                        ],
                        total: state.total - delItem.price 
                    }
                }
                
        default: 
            return state;
    }
    
}

export default reducer;