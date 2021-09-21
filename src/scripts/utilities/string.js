export const stripTags = (str) => {
    return str
             .replace(/(<(br[^>]*)>)/ig, '\n')
             .replace(/(<([^>]+)>)/ig,'');
}
