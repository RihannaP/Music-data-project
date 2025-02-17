
import { getMostListenedSong} from "./calculation.js";
import { getListenEvents} from "./data.js";

test("It should return the most song count for user2 ", () => {
const userId = 2;
const listenEvents = getListenEvents(userId);
const mostListenedSongCount = getMostListenedSong(listenEvents, false, false);

expect(mostListenedSongCount).toEqual("Frank Turner - I Still Believe")
})