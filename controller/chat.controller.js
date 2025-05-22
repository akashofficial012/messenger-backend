import { TryCatch } from "../middlewares/error";
import { Chat } from "../models/chatModel";
import { ALERT, REFETCH_CHATS,} from "../constants/events.js";

const newGroupChat  = TryCatch(async (req, res, next) => {

    const {name , members} = req.body;

    if (members.length < 2) {
        return res.json({
            success: false,
            message: "Atleast 2 members are required to create a group chat",
        });
    }
    const allMembers = [...members, req.user];

    const groupChat = await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers,
    });

      emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

    return res.json({
        success: true,
        message: "Group created successfully",
    });


});

export { newGroupChat };