import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// slices
// import mailReducer from './slices/mail';
import chatReducer from "./slices/chat";
import modelReducer from "./slices/model";
// import productReducer from './slices/product';
// import calendarReducer from './slices/calendar';
// import kanbanReducer from './slices/kanban';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const chatPersistConfig = {
  key: "chat",
  storage,
  keyPrefix: "redux-chat-",
};

const rootReducer = combineReducers({
  chat: persistReducer(chatPersistConfig, chatReducer),
  model: modelReducer,
  // product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
