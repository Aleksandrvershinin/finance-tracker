import GroupAccount from '@/entities/groupAccount/ui/GroupAccount'
import TagAccount from '@/entities/tagAccount/ui/TagAccount'

export default function AccountTagsPage() {
    return (
        <div className="container">
            <div className="space-y-6 lg:flex lg:gap-x-6 lg:space-y-0">
                <div>
                    <GroupAccount />
                </div>
                <div>
                    <TagAccount />
                </div>
            </div>
        </div>
    )
}
