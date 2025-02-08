import Button from '@/shared/components/ui/Button/Button'
import { TAccount } from '../../types/account.types'
import ArrowIcon from '@/shared/components/ui/icons/ArrowIcon'

interface Props {
    accountId: TAccount['id']
}

function TransferBtn({ accountId }: Props) {
    return (
        <Button
            key={accountId}
            title="Перевод"
            className="!p-1 rounded-full"
            myColor={'softPurple'}
        >
            <ArrowIcon direction="right" size={20} />
        </Button>
    )
}

export default TransferBtn
