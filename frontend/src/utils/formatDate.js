export const formatDate = (dateString) =>
    dateString? new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
}): "N/A"