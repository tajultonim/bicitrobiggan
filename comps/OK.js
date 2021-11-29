import * as React from "react"
import {
    Frame,
    Data,
    Color,
    useCycle,
    Override,
    motionValue,
    useTransform,
} from "framer"


// Header position to animate to
const data = Data({
    yPositionHeaderAnimate: 0,
})
// For Scroll Component
export function TrackScroll() {
    const travel = 58
    return {
        onScroll(info) {
            if (info.velocity.y < 0) {
                // negative velocity -> we’re scrolling up
                console.log("current point: " + info.point.y)
                if (info.point.y >= 0) {
                    // bouncing back up after scrolling beyond the overdrag
                    data.yPositionHeaderAnimate = 0
                } else if (info.point.y > -travel) {
                    // start of scroll: header follows along until travel
                    data.yPositionHeaderAnimate = info.point.y
                } else {
                    // scrolled more than travel: header stays put
                    data.yPositionHeaderAnimate = -travel
                }
            } else {
                // positive velocity -> we’re scrolling down
                // Header always at start position
                data.yPositionHeaderAnimate = 0
            }
        },
    }
}
// For header
export function StickyHeader(){
    return {
        animate: { y: data.yPositionHeaderAnimate },
        transition: { duration: 0.2 },
    }
}