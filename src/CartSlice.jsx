import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // مصفوفة عناصر السلة
  },
  reducers: {
    // إضافة عنصر للسلة (يزيد الكمية إذا كان موجود مسبقًا)
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // إزالة عنصر من السلة حسب الاسم
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      // ملاحظة: إذا أرسلت اسم العنصر مباشرة (string)، فهذا صحيح
      // إذا أرسلت كائن {name} يجب أن تستخدم item.name !== action.payload.name
    },
    // تحديث كمية عنصر معين
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// تصدير منشئي الأكشنات للاستعمال في المكونات الأخرى
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// تصدير المخفض كافتراضي لاستخدامه في store.js
export default CartSlice.reducer;
