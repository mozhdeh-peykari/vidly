export function filter(items, filterId)
{
    return items.filter(x=>x.genre._id == filterId || filterId == -1);
}