import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { productType } from "./productType";
import { salesType } from "./salesType";

export const schema = {
  types: [blockContentType, categoryType, productType, salesType, orderType],
};
