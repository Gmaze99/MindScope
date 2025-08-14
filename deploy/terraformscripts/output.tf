output "outputofamiId"{
    value = data.aws_ami.latest_amazon_linux
}


output "vpc_id"{
    value = data.aws_vpcs.default_vpc
}