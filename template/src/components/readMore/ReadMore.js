/**
 * Example
<ReadMore numberOfLine={2}>
    {string}
</ReadMore>
 */
import React, { memo, useState } from 'react';
import { Text, View } from 'react-native';
import isEqual from 'react-fast-compare';

function ReadMoreComponent({
    children,
    numberOfLine = null,
    style = { textAlign: 'left', color: 'black' },
    styleTextShowMoreOrLess = { color: 'red' }
}) {
    const [lines, setLines] = useState([]);
    const [showMore, setShowMore] = useState(numberOfLine === null ? false : true);

    let string = children;
    if (numberOfLine !== null && showMore) {
        string = "";
        for (let i = 0; i < numberOfLine; i++) {
            if (i + 1 > lines.length) {
                i = 1000;
            } else {
                string = string + lines[i].text;
                if (i + 1 === numberOfLine) {
                    string = string.slice(0, string.length - 13);
                }
            }
        }
    }
    return (
        <>
            <View pointerEvents='none' style={{ position: 'absolute', width: '100%', opacity: 0, ...style }}>
                <Text
                    style={style}
                    onTextLayout={(e) => { setLines(e.nativeEvent.lines) }}>
                    {children}
                </Text>
            </View>

            <Text style={style}>

                {string.trimEnd()}
                {showMore && <Text style={{ color: 'black', ...style }}>{'... '}</Text>}

                <Text
                    onPress={() => setShowMore(!showMore)}
                    style={styleTextShowMoreOrLess}>
                    {showMore ? "See more" : " See less"}
                </Text>

            </Text>

        </>
    );
}
export default ReadMore = memo(ReadMoreComponent, isEqual);

