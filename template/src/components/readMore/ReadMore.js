/**
 * Example
<ReadMore numberOfLine={2}>
    {string}
</ReadMore>
 */
import React, { memo, useState } from 'react';
import { View } from 'react-native';
import isEqual from 'react-fast-compare';
import { Text } from '../text';

function ReadMoreComponent({
    children,
    numberOfLine = null,
    style = { paddingHorizontal: 0 },
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
                    string = string.slice(0, string.length - 14)
                }
            }
        }
    }
    return (
        <>
            <View pointerEvents='none' style={{ position: 'absolute', width: '100%', opacity: 0 }}>
                <Text
                    style={{ textAlign: 'justify', ...style }}
                    onTextLayout={(e) => { setLines(e.nativeEvent.lines); }}>
                    {children}
                </Text>
            </View>

            <Text style={{ textAlign: 'justify', ...style }}>

                {string.trimEnd()}
                {showMore && <Text>{'... '}</Text>}

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

