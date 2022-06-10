function commonParent(dom1, dom2) {
    if (dom1 === dom2) {
        return dom1
    }
    if (dom1.contains(dom2)) {
        return dom1
    }
    if (dom2.contains(dom1)) {
        return dom2
    }
    return commonParent(dom1.parent, dom2.parent)
}